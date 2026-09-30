using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Windows.Forms;

internal static class CreatureAnimationStudio
{
    [STAThread] static void Main() { Application.EnableVisualStyles(); Application.Run(new Studio()); }

    sealed class Room { public string Id, Name, CharacterPath, Theme; }
    sealed class ArchiveItem { public string Title, Signature, Prompt; public override string ToString() { return Title; } }

    sealed class Studio : Form
    {
        readonly string dataRoot = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "CreatureAnimationStudio");
        readonly ComboBox roomPicker = new ComboBox();
        readonly TextBox roomTheme = new TextBox(), result = new TextBox();
        readonly Label characterName = new Label();
        readonly PictureBox characterPreview = new PictureBox();
        readonly ListBox archiveList = new ListBox();
        readonly Random random = new Random();
        readonly List<Room> rooms = new List<Room>();
        Room active;

        readonly string[] settings = { "a miniature omakase bar", "a sunlit fantasy bakery", "a tiny moonlit garden", "a cozy magical kitchen", "a sparkling seaside market", "a whimsical dessert train" };
        readonly string[] props = { "a jewel-like strawberry parfait", "a tiny glowing lantern", "a floating teacup", "a miniature rainbow cake", "a soft cloud-shaped mochi", "a crystal fruit basket" };
        readonly string[] actions = { "carefully investigates", "chases a playful floating sparkle around", "tries to prepare", "discovers and gently tastes", "protects", "joyfully plays with" };
        readonly string[] endings = { "opens a final delighted pose toward the camera", "does one gentle happy spin and waves", "settles into a loopable curious head tilt", "leaps softly and lands in a cute pose" };

        public Studio()
        {
            Directory.CreateDirectory(dataRoot);
            Text = "Creature Animation Prompt Studio"; Size = new Size(1300, 820); MinimumSize = new Size(1060, 680);
            BackColor = Color.FromArgb(245, 248, 252); Font = new Font("Malgun Gothic", 10);
            var header = new Panel { Dock = DockStyle.Top, Height = 100, BackColor = Color.White, Padding = new Padding(24, 16, 24, 10) };
            header.Controls.Add(new Label { Text = "CHARACTER VIDEO WORKSHOP", Dock = DockStyle.Top, Height = 22, ForeColor = Color.FromArgb(42, 163, 151), Font = new Font("Consolas", 10, FontStyle.Bold) });
            header.Controls.Add(new Label { Text = "TikTok 3D 애니메이션 프롬프트 작업실", Dock = DockStyle.Top, Height = 42, ForeColor = Color.FromArgb(33, 53, 79), Font = new Font("Malgun Gothic", 19, FontStyle.Bold) });
            header.Controls.Add(new Label { Text = "작업실마다 다른 캐릭터 기준 사진 · 주제 · 보관함을 사용합니다.", Dock = DockStyle.Top, Height = 23, ForeColor = Color.FromArgb(100, 116, 139) });
            Controls.Add(header);
            var grid = new TableLayoutPanel { Dock = DockStyle.Fill, ColumnCount = 3, Padding = new Padding(14), BackColor = BackColor };
            grid.ColumnStyles.Add(new ColumnStyle(SizeType.Absolute, 315)); grid.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 100)); grid.ColumnStyles.Add(new ColumnStyle(SizeType.Absolute, 265));
            grid.Controls.Add(BuildControls(), 0, 0); grid.Controls.Add(BuildResult(), 1, 0); grid.Controls.Add(BuildArchive(), 2, 0); Controls.Add(grid);
            LoadRooms();
        }

        Panel Card() { return new Panel { Dock = DockStyle.Fill, Padding = new Padding(16), Margin = new Padding(5), BackColor = Color.White, BorderStyle = BorderStyle.FixedSingle }; }
        Label LabelOf(string text) { return new Label { Text = text, AutoSize = false, Width = 270, Height = 25, Margin = new Padding(2, 9, 2, 2), Font = new Font("Malgun Gothic", 9, FontStyle.Bold), ForeColor = Color.FromArgb(51, 65, 85) }; }
        Button ButtonOf(string text, Action action, bool primary = false)
        {
            var b = new Button { Text = text, Width = 275, Height = 39, Margin = new Padding(2, 7, 2, 2), FlatStyle = FlatStyle.Flat, BackColor = primary ? Color.FromArgb(44, 174, 160) : Color.FromArgb(237, 244, 250), ForeColor = primary ? Color.White : Color.FromArgb(35, 69, 109) };
            b.FlatAppearance.BorderColor = primary ? b.BackColor : Color.FromArgb(190, 209, 226); b.Click += (s, e) => action(); return b;
        }
        Control BuildControls()
        {
            var card = Card(); var flow = new FlowLayoutPanel { Dock = DockStyle.Fill, FlowDirection = FlowDirection.TopDown, WrapContents = false, AutoScroll = true };
            flow.Controls.Add(LabelOf("작업실")); roomPicker.Width = 275; roomPicker.DropDownStyle = ComboBoxStyle.DropDownList; roomPicker.SelectedIndexChanged += (s, e) => SelectRoom(); flow.Controls.Add(roomPicker);
            flow.Controls.Add(ButtonOf("+ 새 작업실 만들기", NewRoom));
            flow.Controls.Add(LabelOf("이 작업실의 캐릭터 기준 사진"));
            characterPreview.Size = new Size(100, 100); characterPreview.SizeMode = PictureBoxSizeMode.Zoom; characterPreview.BackColor = Color.FromArgb(242, 246, 250); flow.Controls.Add(characterPreview);
            characterName.Width = 275; characterName.Height = 24; characterName.ForeColor = Color.FromArgb(100, 116, 139); characterName.Text = "사진을 첨부해 주세요"; flow.Controls.Add(characterName);
            flow.Controls.Add(ButtonOf("캐릭터 사진 첨부", AttachCharacter));
            flow.Controls.Add(LabelOf("작업실 주제")); roomTheme.Multiline = true; roomTheme.Width = 275; roomTheme.Height = 96; roomTheme.BackColor = Color.FromArgb(250, 252, 255); roomTheme.Text = "이 캐릭터가 움직이는 귀엽고 몰입감 있는 TikTok 3D 애니메이션"; flow.Controls.Add(roomTheme);
            flow.Controls.Add(ButtonOf("작업실 설정 저장", SaveRoom));
            flow.Controls.Add(ButtonOf("완성 프롬프트 만들기", Generate, true)); flow.Controls.Add(ButtonOf("현재 결과 보관하기", SaveArchive));
            card.Controls.Add(flow); return card;
        }
        Control BuildResult()
        {
            var card = Card(); var copy = ButtonOf("영상 · BGM · 효과음 포함 전체 복사", () => { if (!String.IsNullOrWhiteSpace(result.Text)) Clipboard.SetText(result.Text); }); copy.Dock = DockStyle.Top; card.Controls.Add(copy);
            card.Controls.Add(new Label { Text = "완성 프롬프트", Dock = DockStyle.Top, Height = 29, Font = new Font("Malgun Gothic", 11, FontStyle.Bold), ForeColor = Color.FromArgb(33, 53, 79) });
            result.Dock = DockStyle.Fill; result.Multiline = true; result.ReadOnly = true; result.ScrollBars = ScrollBars.Vertical; result.Font = new Font("Consolas", 9); result.BackColor = Color.FromArgb(250, 252, 255); result.BorderStyle = BorderStyle.FixedSingle; card.Controls.Add(result); return card;
        }
        Control BuildArchive()
        {
            var card = Card(); card.Controls.Add(new Label { Text = "보관함 · 현재 작업실", Dock = DockStyle.Top, Height = 31, Font = new Font("Malgun Gothic", 10, FontStyle.Bold), ForeColor = Color.FromArgb(33, 53, 79) });
            archiveList.Dock = DockStyle.Fill; archiveList.DoubleClick += (s, e) => { var item = archiveList.SelectedItem as ArchiveItem; if (item != null) result.Text = item.Prompt; }; archiveList.DisplayMember = "Title"; card.Controls.Add(archiveList); return card;
        }

        string RoomsPath { get { return Path.Combine(dataRoot, "rooms.dat"); } }
        string ArchivePath(string id) { return Path.Combine(dataRoot, "archive-" + id + ".dat"); }
        string Encode(string s) { return Convert.ToBase64String(Encoding.UTF8.GetBytes(s ?? "")); }
        string Decode(string s) { try { return Encoding.UTF8.GetString(Convert.FromBase64String(s)); } catch { return ""; } }
        void LoadRooms()
        {
            rooms.Clear(); roomPicker.Items.Clear();
            if (File.Exists(RoomsPath)) foreach (var line in File.ReadAllLines(RoomsPath)) { var p = line.Split('|'); if (p.Length == 4) rooms.Add(new Room { Id = p[0], Name = Decode(p[1]), CharacterPath = Decode(p[2]), Theme = Decode(p[3]) }); }
            if (rooms.Count == 0) rooms.Add(new Room { Id = Guid.NewGuid().ToString("N"), Name = "새 작업실", Theme = "캐릭터가 주제에 맞는 TikTok 3D 애니메이션에서 움직이는 이야기", CharacterPath = "" });
            roomPicker.Items.AddRange(rooms.Cast<object>().ToArray()); roomPicker.DisplayMember = "Name"; roomPicker.SelectedIndex = 0; SaveRooms();
        }
        void SaveRooms() { File.WriteAllLines(RoomsPath, rooms.Select(r => r.Id + "|" + Encode(r.Name) + "|" + Encode(r.CharacterPath) + "|" + Encode(r.Theme))); }
        void NewRoom()
        {
            var name = Microsoft.VisualBasic.Interaction.InputBox("작업실 이름", "새 작업실", "새 캐릭터 작업실"); if (String.IsNullOrWhiteSpace(name)) return;
            var r = new Room { Id = Guid.NewGuid().ToString("N"), Name = name.Trim(), Theme = "캐릭터가 주제에 맞는 TikTok 3D 애니메이션에서 움직이는 이야기", CharacterPath = "" }; rooms.Add(r); SaveRooms(); roomPicker.Items.Add(r); roomPicker.SelectedItem = r;
        }
        void SelectRoom()
        {
            active = roomPicker.SelectedItem as Room; if (active == null) return; roomTheme.Text = active.Theme; characterName.Text = String.IsNullOrEmpty(active.CharacterPath) ? "사진을 첨부해 주세요" : Path.GetFileName(active.CharacterPath);
            characterPreview.Image = null; if (File.Exists(active.CharacterPath)) { try { characterPreview.Image = Image.FromFile(active.CharacterPath); } catch { } } LoadArchive(); result.Clear();
        }
        void SaveRoom() { if (active == null) return; active.Theme = roomTheme.Text.Trim(); SaveRooms(); MessageBox.Show("작업실 설정을 저장했습니다.", "저장 완료"); }
        void AttachCharacter()
        {
            if (active == null) return; using (var dialog = new OpenFileDialog { Title = "이 작업실의 캐릭터 기준 사진 선택", Filter = "이미지 파일|*.png;*.jpg;*.jpeg;*.webp" })
            { if (dialog.ShowDialog() != DialogResult.OK) return; active.CharacterPath = dialog.FileName; SaveRooms(); SelectRoom(); }
        }
        List<ArchiveItem> Archives()
        {
            if (active == null || !File.Exists(ArchivePath(active.Id))) return new List<ArchiveItem>();
            return File.ReadAllLines(ArchivePath(active.Id)).Select(line => { var p = line.Split('|'); return p.Length == 3 ? new ArchiveItem { Title = Decode(p[0]), Signature = Decode(p[1]), Prompt = Decode(p[2]) } : null; }).Where(x => x != null).ToList();
        }
        void LoadArchive() { archiveList.Items.Clear(); archiveList.Items.AddRange(Archives().Cast<object>().ToArray()); }
        void SaveArchive()
        {
            if (active == null || String.IsNullOrWhiteSpace(result.Text)) return; var title = Extract("제목 :", "이번 영상"); if (String.IsNullOrWhiteSpace(title)) title = DateTime.Now.ToString("yyyy-MM-dd HH:mm");
            var signature = Extract("SIGNATURE:", "[이번 영상]"); File.AppendAllText(ArchivePath(active.Id), Encode(title) + "|" + Encode(signature) + "|" + Encode(result.Text) + Environment.NewLine); LoadArchive();
        }
        string Extract(string key, string fallback) { var i = result.Text.IndexOf(key); if (i < 0) return fallback; var e = result.Text.IndexOf('\n', i); return result.Text.Substring(i + key.Length, (e < 0 ? result.Text.Length : e) - i - key.Length).Trim(); }
        string Pick(string[] values) { return values[random.Next(values.Length)]; }
        void Generate()
        {
            if (active == null) return; SaveRoom(); if (String.IsNullOrWhiteSpace(active.CharacterPath)) { MessageBox.Show("먼저 이 작업실의 캐릭터 기준 사진을 첨부해 주세요.", "캐릭터 사진 필요"); return; }
            var old = Archives().Select(a => a.Signature).ToHashSet(); string scene, prop, action, signature; int attempts = 0;
            do { scene = Pick(settings); prop = Pick(props); action = Pick(actions); signature = scene + " / " + prop + " / " + action; attempts++; } while (old.Contains(signature) && attempts < 40);
            var title = active.Name + " — " + prop + "의 하루"; var description = active.Theme + " 속에서 첨부 캐릭터가 " + prop + "을(를) " + action + " 4장면 TikTok 3D 애니메이션.";
            result.Text = "[이번 영상]\r\n제목 : " + title + "\r\n소개글 : " + description + "\r\nSIGNATURE: " + signature + "\r\n\r\n[공통 캐릭터 고정 프롬프트]\r\nUse the character in the attached reference image as the only protagonist. Preserve its exact face, proportions, colors, costume, defining features and identity in all four scenes. Do not invent a different character. High-end stylized 3D animation, TikTok vertical 9:16, consistent character model, consistent environment, cinematic global illumination.\r\n\r\n[장면 1 — 발견]\r\nImage/video prompt: In " + scene + ", the attached-reference character " + action + " " + prop + ". Establish the theme: " + active.Theme + ". Medium cinematic shot, clear character and prop, curious readable expression, no cut.\r\nMotion & camera: gentle approach, stable camera axis, natural character movement.\r\nSound: subtle location ambience, short character reaction, BGM begins lightly.\r\n\r\n[장면 2 — 상호작용]\r\nImage/video prompt: Continue seamlessly in the same location and lighting. The exact same character interacts physically with the same " + prop + "; preserve its position, scale and any marks from scene 1. Close-up on expressive face and hands/paws.\r\nMotion & camera: smooth push-in, tactile action timed clearly.\r\nSound: synchronized contact/ASMR effects appropriate to the prop, gentle character sound.\r\n\r\n[장면 3 — 주제 전개]\r\nImage/video prompt: The action develops into the core moment of the theme: " + active.Theme + ". Keep the identical character, " + prop + ", environment and direction. Add only theme-relevant magical or environmental detail, never obscure the character.\r\nMotion & camera: camera follows the action without jump cuts; expressive body motion.\r\nSound: themed effects rise naturally; music builds with the action.\r\n\r\n[장면 4 — 엔딩]\r\nImage/video prompt: Resolve the same story in the same environment. The attached-reference character " + Pick(endings) + ", clearly showing the completed theme moment and " + prop + ". Premium loopable TikTok ending, clean composition, no text.\r\nMotion & camera: graceful small pullback, final one-second satisfying hold.\r\nSound: warm final character sound, soft resolving effect.\r\n\r\n[BGM · 효과음]\r\nOne continuous bright, cute, cinematic instrumental BGM with no vocals. Start curious in scene 1, become playful in scene 2, build in scene 3, resolve warmly in scene 4. Keep music below character sounds and synchronized prop effects.\r\n\r\n[공통 네거티브 프롬프트]\r\ndifferent character, inconsistent face, character redesign, extra characters, human hands, inconsistent prop, teleportation, sudden environment change, jump cut, extra limbs, malformed anatomy, horror, gore, text, subtitles, logo, watermark, UI.";
        }
    }
}
