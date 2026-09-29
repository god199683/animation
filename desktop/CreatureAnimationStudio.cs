using System;
using System.Drawing;
using System.Windows.Forms;

internal static class CreatureAnimationStudio
{
    static readonly Random R = new Random();
    static readonly string[] Creatures = { "a hand-blown translucent glass creature", "a tiny fox spirit with shimmering fur", "a round jelly creature with a glowing core", "a miniature forest sprite", "a small alien with iridescent skin", "a baby dragon with pearlescent scales" };
    static readonly string[] Food = { "salmon nigiri", "jewel-like sea urchin sushi", "starlight ramen", "a crystal strawberry tart", "a glowing fruit dessert" };
    static readonly string[] Changes = { "its belly fills with moving pearly light", "tiny glowing bubbles circle around its body", "small crystal blossoms emerge and float away", "its ears and tail briefly change color" };
    static readonly string[] Music = { "soft Japanese jazz with brushed percussion", "dreamy music-box melody and warm pads", "sparkling ambient electronic music", "gentle whimsical orchestral music" };
    static readonly string[] Effects = { "delicate chopstick taps, ceramic plate clinks, tiny happy chewing", "magic chimes, bubbling broth, a tiny wooden spoon stirring", "soft crystal clinks, gentle whooshes, and warm room tone" };

    [STAThread]
    static void Main()
    {
        Application.EnableVisualStyles();
        Application.Run(new StudioForm());
    }

    static string Pick(string[] values) { return values[R.Next(values.Length)]; }

    sealed class StudioForm : Form
    {
        readonly TextBox topic = new TextBox();
        readonly ComboBox duration = new ComboBox();
        readonly ComboBox mood = new ComboBox();
        readonly TextBox video = new TextBox();
        readonly TextBox audio = new TextBox();

        public StudioForm()
        {
            Text = "Creature Animation Prompt Studio";
            MinimumSize = new Size(900, 700);
            Size = new Size(1040, 790);
            BackColor = Color.FromArgb(9, 13, 27);
            ForeColor = Color.FromArgb(243, 247, 255);
            Font = new Font("Malgun Gothic", 10);

            var title = new Label { Text = "3D 생명체 애니메이션 프롬프트", Font = new Font("Malgun Gothic", 20, FontStyle.Bold), ForeColor = Color.FromArgb(118, 244, 228), Dock = DockStyle.Top, Height = 48 };
            var description = new Label { Text = "주제를 입력하면 영상·배경음·효과음 프롬프트를 함께 만듭니다.", ForeColor = Color.FromArgb(169, 184, 215), Dock = DockStyle.Top, Height = 28 };
            var layout = new TableLayoutPanel { Dock = DockStyle.Fill, ColumnCount = 2, RowCount = 1, Padding = new Padding(18), BackColor = Color.FromArgb(9, 13, 27) };
            layout.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 37));
            layout.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 63));
            var left = new FlowLayoutPanel { Dock = DockStyle.Fill, FlowDirection = FlowDirection.TopDown, WrapContents = false, Padding = new Padding(12), BackColor = Color.FromArgb(17, 26, 48) };
            var right = new TableLayoutPanel { Dock = DockStyle.Fill, RowCount = 4, Padding = new Padding(12), BackColor = Color.FromArgb(17, 26, 48) };
            right.RowStyles.Add(new RowStyle(SizeType.Absolute, 30)); right.RowStyles.Add(new RowStyle(SizeType.Percent, 62)); right.RowStyles.Add(new RowStyle(SizeType.Absolute, 30)); right.RowStyles.Add(new RowStyle(SizeType.Percent, 38));
            left.Controls.Add(LabelOf("애니메이션 주제"));
            topic.Multiline = true; topic.Text = "작은 유리 생명체의 오마카세 먹방"; topic.Size = new Size(310, 105); Style(topic); left.Controls.Add(topic);
            left.Controls.Add(LabelOf("영상 길이")); duration.Items.AddRange(new object[] { "8–10 seconds", "5–6 seconds", "12–15 seconds" }); duration.SelectedIndex = 0; duration.Size = new Size(310, 30); Style(duration); left.Controls.Add(duration);
            left.Controls.Add(LabelOf("감정 톤")); mood.Items.AddRange(new object[] { "장난스럽고 귀엽게", "몽환적이고 섬세하게", "고급스럽고 시네마틱하게" }); mood.SelectedIndex = 0; mood.Size = new Size(310, 30); Style(mood); left.Controls.Add(mood);
            var generate = new Button { Text = "영상 · 사운드 프롬프트 생성", Size = new Size(310, 48), BackColor = Color.FromArgb(118, 244, 228), ForeColor = Color.FromArgb(9, 18, 36), FlatStyle = FlatStyle.Flat, Font = new Font("Malgun Gothic", 10, FontStyle.Bold), Margin = new Padding(3, 22, 3, 3) }; generate.Click += (s, e) => Generate(); left.Controls.Add(generate);
            var copyVideo = CopyButton("영상 프롬프트 복사", video); var copyAudio = CopyButton("사운드 프롬프트 복사", audio);
            right.Controls.Add(LabelOf("3D 영상 프롬프트"), 0, 0); right.Controls.Add(video, 0, 1); right.Controls.Add(copyVideo, 0, 1);
            right.Controls.Add(LabelOf("배경음 · 효과음 프롬프트"), 0, 2); right.Controls.Add(audio, 0, 3); right.Controls.Add(copyAudio, 0, 3);
            video.Anchor = AnchorStyles.Top | AnchorStyles.Bottom | AnchorStyles.Left | AnchorStyles.Right; audio.Anchor = video.Anchor; video.Margin = new Padding(3, 30, 3, 3); audio.Margin = new Padding(3, 30, 3, 3); OutputStyle(video); OutputStyle(audio);
            layout.Controls.Add(left, 0, 0); layout.Controls.Add(right, 1, 0); Controls.Add(layout); Controls.Add(description); Controls.Add(title); Generate();
        }
        Label LabelOf(string text) { return new Label { Text = text, ForeColor = Color.FromArgb(243, 247, 255), AutoSize = false, Height = 28, Width = 500, Font = new Font("Malgun Gothic", 9, FontStyle.Bold) }; }
        void Style(Control c) { c.BackColor = Color.FromArgb(9, 17, 36); c.ForeColor = Color.White; }
        void OutputStyle(TextBox c) { c.Multiline = true; c.ReadOnly = true; c.ScrollBars = ScrollBars.Vertical; c.BackColor = Color.FromArgb(8, 15, 32); c.ForeColor = Color.FromArgb(220, 231, 255); c.Font = new Font("Consolas", 9); }
        Button CopyButton(string text, TextBox source) { var b = new Button { Text = text, Width = 150, Height = 25, Anchor = AnchorStyles.Top | AnchorStyles.Right, FlatStyle = FlatStyle.Flat, BackColor = Color.FromArgb(35, 50, 82), ForeColor = Color.White }; b.Click += (s, e) => Clipboard.SetText(source.Text); return b; }
        void Generate()
        {
            var idea = String.IsNullOrWhiteSpace(topic.Text) ? "a charming tiny creature story" : topic.Text.Trim();
            var tone = mood.SelectedIndex == 1 ? "dreamy and softly magical" : mood.SelectedIndex == 2 ? "refined and cinematic" : "playful and adorable";
            video.Text = "Create a fully 3D animated vertical 9:16 short-form video based on: “" + idea + ". ”\r\n\r\nFeature " + Pick(Creatures) + ", selected to suit the theme. Give it expressive eyes, believable 3D weight, and tactile material detail. The character interacts with " + Pick(Food) + ". As the moment unfolds, " + Pick(Changes) + ".\r\n\r\nThe reaction is " + tone + ". Premium 3D character animation, macro cinematic close-up, physically based materials, shallow depth of field, soft volumetric lighting, detailed miniature set, smooth animation. One continuous " + duration.Text + " shot. No dialogue, no on-screen text, no watermark, no 2D illustration, no horror.";
            audio.Text = "Create an audio bed for a " + duration.Text + " vertical 3D animated short based on: “" + idea + ". ”\r\n\r\nBackground music: " + Pick(Music) + ", light and unobtrusive, timed to the character’s reactions. Sound effects: " + Pick(Effects) + ". Add gentle spatial ambience and clean, satisfying ASMR detail. No vocals, no spoken words, no abrupt loud sounds, no copyright-identifiable melody.";
        }
    }
}
