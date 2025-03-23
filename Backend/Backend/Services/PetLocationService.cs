using Backend.Dtos;
using Backend.Interfaces;
using Backend.Models;
using System;
using System.Threading.Tasks;

namespace Backend.Services
{
    public class PetLocationService : IPetLocationService
    {
        private readonly ApplicationDbContext _context;
        private readonly INotificationService _notificationService;

        public PetLocationService(ApplicationDbContext context, INotificationService notificationService)
        {
            _context = context;
            _notificationService = notificationService;
        }

        public async Task<PetLocationHistory> SubmitLocationAsync(PetLocationDto dto)
        {
            // 1) Find the PetCard
            var petCard = await _context.PetCards.FindAsync(dto.PetCardID);
            if (petCard == null)
                throw new Exception($"PetCard with ID {dto.PetCardID} not found.");

            // 2) Create a new PetLocationHistory record
            var history = new PetLocationHistory
            {
                PetCardID = dto.PetCardID,
                FinderName = dto.FinderName,
                FinderContact = dto.FinderContact,
                Location = dto.Location,
                Latitude = dto.Latitude,
                Longitude = dto.Longitude,
                DateFound = DateTime.UtcNow
            };

            _context.PetLocationHistories.Add(history);

            // 3) Update PetCard.LastLocationFound
            //    (If you want to store lat/long in a single string, do something like: 
            //     petCard.LastLocationFound = $"{dto.Latitude},{dto.Longitude}"  )
            petCard.LastLocationFound = dto.Location;

            // 4) Save changes
            await _context.SaveChangesAsync();

            // 5) Send a notification to the pet’s owner
            //    The PetCard has a .UserID or might get it from the pet profile.  
            //    If your PetCard references an owner user, do:
            var userId = petCard.UserID; 
            if (userId > 0)
            {
                await _notificationService.SendNotificationAsync(new Backend.DTOs.NotificationDto
                {
                    UserID = userId,
                    Title = "Pet Found!",
                    Message = $"Your pet {petCard.PetName} was found at: {dto.Location}",
                    Type = "PetLocation",
                    ReferenceID = petCard.PetCardID
                });
            }

            return history;
        }
    }
}
