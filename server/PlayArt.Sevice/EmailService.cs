using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using System.Threading.Tasks;

public class EmailService
{
    public async Task SendEmailAsync(string recipientEmail, string subject, string messageBody)
    {
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress("Your Name", "youremail@gmail.com"));
        message.To.Add(new MailboxAddress("", recipientEmail));
        message.Subject = subject;

        message.Body = new TextPart("html")
        {
            Text = messageBody
        };

        using (var client = new SmtpClient())
        {
            // עקיפת בדיקת תעודת השרת (רק למטרות בדיקה)
            client.ServerCertificateValidationCallback = (sender, certificate, chain, errors) => true;

            // התחברות לשרת SMTP של Gmail עם STARTTLS
            await client.ConnectAsync("smtp.gmail.com", 587, SecureSocketOptions.StartTls);

            // אימות עם שם המשתמש והסיסמה שלך
            await client.AuthenticateAsync("r0504180710@gmail.com", "r4180710");

            // שליחת המייל
            await client.SendAsync(message);

            // ניתוק
            await client.DisconnectAsync(true);
        }
    }
}
