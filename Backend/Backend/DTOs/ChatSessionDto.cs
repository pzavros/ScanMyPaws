using System;
using System.Collections.Generic;

namespace Backend.DTOs
{
    public class ChatSessionDto
    {
        public int ChatSessionId { get; set; }
        public int PetID { get; set; }
        public int OwnerUserID { get; set; }

        public string FinderEphemeralId { get; set; }
        public string FinderName { get; set; }
        public string FinderSurname { get; set; }
        public string FinderEmail { get; set; }

        public DateTime DateCreated { get; set; }
        public DateTime? DateModified { get; set; }

        public List<ChatMessageDto> Messages { get; set; }
    }
}