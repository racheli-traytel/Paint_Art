using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

public class EmailService
{
    public async Task SendEmailAsync(string toEmail, string subject, string body)
    {
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress("paintart", "paintart.rt@gmail.com"));
        message.To.Add(MailboxAddress.Parse(toEmail));
        message.Subject = subject;
        message.Body = new TextPart("plain") { Text = body };

        using var client = new SmtpClient();
        await client.ConnectAsync("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
        await client.AuthenticateAsync("paintart.rt@gmail.com", "ywvc gmif fcyx dxrv");
        await client.SendAsync(message);
        await client.DisconnectAsync(true);
    }
}

