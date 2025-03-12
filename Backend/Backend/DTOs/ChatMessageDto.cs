public class ChatMessageDto
{
    public int ChatMessageId { get; set; }
    public Guid ChatSessionId { get; set; }
    public string SenderId { get; set; }
    public string MessageContent { get; set; }
    public DateTime SentAt { get; set; }
    public bool IsRead { get; set; }
}