using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class ChatSession
    {
        public DateTime DateCreated { get; set; } = DateTime.Now;
        public DateTime? DateModified { get; set; }
        [Key]
        public int ChatSessionId { get; set; }
        // The Pet that this chat is about
        public int PetID { get; set; }

        // The user who owns the pet
        public int OwnerUserID { get; set; }

        // Ephemeral ID for the finder
        public string FinderEphemeralId { get; set; }

        // Optional: Finder details if you want them
        public string FinderName { get; set; }
        public string FinderSurname { get; set; }
        public string FinderEmail { get; set; }

        // Navigation property
        public virtual ICollection<ChatMessage> Messages { get; set; }
    }
}