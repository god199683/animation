using System;
using System.Drawing;
using System.Windows.Forms;

internal static class CreatureAnimationStudio
{
    [STAThread] static void Main() { Application.EnableVisualStyles(); Application.Run(new Studio()); }

    sealed class Studio : Form
    {
        readonly Random random = new Random();
        readonly ComboBox workshop = new ComboBox(), length = new ComboBox(), mood = new ComboBox();
        readonly TextBox topic = new TextBox(), output = new TextBox();
        readonly string[] creatures = { "a tiny translucent glass creature", "a baby fox spirit with shimmering fur", "a round jelly creature with a glowing core", "a miniature forest sprite", "a small iridescent alien", "a baby dragon with pearlescent scales" };
        readonly string[] foods = { "salmon nigiri", "jewel-like sea urchin sushi", "starlight ramen", "a crystal strawberry tart", "a glowing fruit dessert" };
        readonly string[] changes = { "its belly fills with moving pearly light", "tiny glowing bubbles orbit its body", "small crystal blossoms emerge and drift away", "its ears and tail change through soft rainbow colors" };

        public Studio()
        {
            Text = "Creature Animation Prompt Studio"; Size = new Size(1110, 800); MinimumSize = new Size(920, 680); BackColor = Color.FromArgb(247, 250, 255); Font = new Font("Malgun Gothic", 10);
            var header = new Panel { Dock = DockStyle.Top, Height = 116, BackColor = Color.White, Padding = new Padding(28, 20, 28, 12) };
            header.Controls.Add(new Label { Text = "ANIMATION WORKSHOP", ForeColor = Color.FromArgb(38, 166, 158), Font = new Font("Consolas", 10, FontStyle.Bold), Dock = DockStyle.Top, Height = 22 });
            header.Controls.Add(new Label { Text = "영상 · 배경음 · 효과음 프롬프트 작업실", ForeColor = Color.FromArgb(28, 40, 68), Font = new Font("Malgun Gothic", 20, FontStyle.Bold), Dock = DockStyle.Top, Height = 45 });
            header.Controls.Add(new Label { Text = "주제를 적으면 붙여넣기용 완성 프롬프트 한 묶음을 만듭니다.", ForeColor = Color.FromArgb(104, 117, 143), Dock = DockStyle.Top, Height = 25 });
            var root = new TableLayoutPanel { Dock = DockStyle.Fill, ColumnCount = 2, Padding = new Padding(22), BackColor = Color.FromArgb(247, 250, 255) }; root.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 35)); root.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 65));
            var controls = Card(); var result = Card(); root.Controls.Add(controls, 0, 0); root.Controls.Add(result, 1, 0);
            controls.Controls.Add(MakeControls()); result.Controls.Add(MakeResult()); Controls.Add(root); Controls.Add(header); Generate();
        }
        Panel Card() { return new Panel { Dock = DockStyle.Fill, BackColor = Color.White, Padding = new Padding(20), Margin = new Padding(8), BorderStyle = BorderStyle.FixedSingle }; }
        Control MakeControls()
        {
            var flow = new FlowLayoutPanel { Dock = DockStyle.Fill, FlowDirection = FlowDirection.TopDown, WrapContents = false, AutoScroll = true };
            flow.Controls.Add(Heading("작업대 선택"));
            workshop.Items.AddRange(new object[] { "🍣 오마카세 먹방", "🫧 판타지 요리", "✦ 자유 주제" }); workshop.SelectedIndex = 0; workshop.SelectedIndexChanged += (s, e) => SetExample(); Style(workshop); flow.Controls.Add(workshop);
            flow.Controls.Add(Heading("애니메이션 주제")); topic.Multiline = true; topic.Size = new Size(325, 125); topic.Text = "작은 유리 생명체의 오마카세 먹방"; Style(topic); flow.Controls.Add(topic);
            flow.Controls.Add(new Label { Text = "예: 아기 여우 정령이 벚꽃 젤리를 먹으며 꼬리가 빛나는 장면", ForeColor = Color.FromArgb(104, 117, 143), Width = 325, Height = 42, Font = new Font("Malgun Gothic", 8) });
            flow.Controls.Add(Heading("클립 길이")); length.Items.AddRange(new object[] { "8–10 seconds", "5–6 seconds", "12–15 seconds" }); length.SelectedIndex = 0; Style(length); flow.Controls.Add(length);
            flow.Controls.Add(Heading("감정 톤")); mood.Items.AddRange(new object[] { "장난스럽고 귀엽게", "몽환적이고 섬세하게", "고급스럽고 시네마틱하게" }); mood.SelectedIndex = 0; Style(mood); flow.Controls.Add(mood);
            var button = new Button { Text = "완성 프롬프트 만들기", BackColor = Color.FromArgb(54, 190, 177), ForeColor = Color.White, FlatStyle = FlatStyle.Flat, Font = new Font("Malgun Gothic", 10, FontStyle.Bold), Size = new Size(325, 48), Margin = new Padding(3, 20, 3, 3) }; button.FlatAppearance.BorderSize = 0; button.Click += (s, e) => Generate(); flow.Controls.Add(button); return flow;
        }
        Control MakeResult()
        {
            var panel = new Panel { Dock = DockStyle.Fill }; var copy = new Button { Text = "전체 복사", Dock = DockStyle.Right, Width = 105, BackColor = Color.FromArgb(235, 241, 255), ForeColor = Color.FromArgb(35, 68, 123), FlatStyle = FlatStyle.Flat }; copy.FlatAppearance.BorderColor = Color.FromArgb(190, 207, 238); copy.Click += (s, e) => { Clipboard.SetText(output.Text); copy.Text = "복사 완료"; var t = new Timer { Interval = 1200 }; t.Tick += (a, b) => { copy.Text = "전체 복사"; t.Stop(); }; t.Start(); };
            panel.Controls.Add(copy); panel.Controls.Add(new Label { Text = "붙여넣기용 완성 프롬프트", Dock = DockStyle.Top, Height = 34, ForeColor = Color.FromArgb(28, 40, 68), Font = new Font("Malgun Gothic", 11, FontStyle.Bold) });
            output.Multiline = true; output.ReadOnly = true; output.ScrollBars = ScrollBars.Vertical; output.Dock = DockStyle.Fill; output.BackColor = Color.FromArgb(250, 252, 255); output.ForeColor = Color.FromArgb(37, 48, 70); output.Font = new Font("Consolas", 9); output.BorderStyle = BorderStyle.FixedSingle; panel.Controls.Add(output); output.BringToFront(); return panel;
        }
        Label Heading(string s) { return new Label { Text = s, Width = 325, Height = 26, Margin = new Padding(3, 10, 3, 2), Font = new Font("Malgun Gothic", 9, FontStyle.Bold), ForeColor = Color.FromArgb(46, 62, 92) }; }
        void Style(Control c) { c.Width = 325; c.BackColor = Color.FromArgb(250, 252, 255); c.ForeColor = Color.FromArgb(30, 42, 66); }
        string Pick(string[] a) { return a[random.Next(a.Length)]; }
        void SetExample() { topic.Text = workshop.SelectedIndex == 0 ? "작은 유리 생명체의 오마카세 먹방" : workshop.SelectedIndex == 1 ? "젤리 생명체가 별빛 라면을 요리한다" : ""; }
        void Generate()
        {
            var idea = String.IsNullOrWhiteSpace(topic.Text) ? "a charming tiny creature story" : topic.Text.Trim();
            var tone = mood.SelectedIndex == 1 ? "dreamy, delicate, and softly magical" : mood.SelectedIndex == 2 ? "refined, cinematic, and quietly luxurious" : "playful, adorable, and full of gentle curiosity";
            var type = workshop.SelectedIndex == 0 ? "an intimate miniature omakase counter with polished dark wood and tiny ceramic plates" : workshop.SelectedIndex == 1 ? "a miniature fantasy kitchen with softly glowing cookware" : "a magical miniature set tailored to the requested theme";
            output.Text = "CLIP 1 — animation\r\n" +
                "Original 3D animated short, vertical 9:16 composition.\r\n" +
                "Scene: " + idea + ". Feature " + Pick(creatures) + " with expressive eyes, believable 3D weight, and tactile material detail. The scene takes place at " + type + ". The character interacts with " + Pick(foods) + ". As the moment unfolds, " + Pick(changes) + ".\r\n" +
                "Style: " + tone + ", premium 3D character animation, physically based materials, macro cinematic close-up, shallow depth of field, soft volumetric lighting, detailed miniature set.\r\n" +
                "Clip length: " + length.Text + ", one continuous take, no cuts, no text or watermark.\r\n" +
                "Negative prompt: 2D illustration, anime, cartoon, horror, injury, broken glass, recognizable logos, text, letters, watermark\r\n\r\n" +
                "AUDIO — background music and sound effects\r\n" +
                "Create synchronized audio for the clip above. Background music: " + (workshop.SelectedIndex == 0 ? "soft Japanese jazz with brushed percussion and warm room tone" : workshop.SelectedIndex == 1 ? "sparkling ambient electronic music with a gentle magical melody" : "cinematic ambient music with a gentle melodic hook") + ".\r\n" +
                "Sound effects: delicate character movement, " + (workshop.SelectedIndex == 0 ? "chopstick taps, ceramic plate clinks, tiny happy chewing" : workshop.SelectedIndex == 1 ? "bubbling broth, crystal clinks, a tiny spoon stirring, magical chimes" : "soft environmental ambience, tactile prop sounds, gentle whooshes") + ".\r\n" +
                "Mix: clean, satisfying ASMR detail, gentle spatial ambience, music below the effects. No vocals, no spoken words, no abrupt loud sounds, no copyright-identifiable melody.";
        }
    }
}
