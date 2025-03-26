using Backend.Dtos;
using Backend.Interfaces;
using Backend.Models;
using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

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
            var petCard = await _context.PetCards.FindAsync(dto.PetCardID);
            if (petCard == null)
                throw new Exception($"PetCard with ID {dto.PetCardID} not found.");

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

            petCard.LastLocationFound = dto.Location;

            await _context.SaveChangesAsync();

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
        public async Task<List<PetLocationHistory>> GetLocationHistoryByPetIdAsync(int petId)
        {
            var petCard = await _context.PetCards.FirstOrDefaultAsync(pc => pc.PetID == petId);

            if (petCard == null)
                throw new Exception($"No PetCard found for PetID {petId}");

            return await _context.PetLocationHistories
                .Where(h => h.PetCardID == petCard.PetCardID)
                .OrderByDescending(h => h.DateFound)
                .ToListAsync();
        }

    }
}
