using Backend.Interfaces;
using Backend.DTOs;
using Backend.Models;
using QRCoder;
using System;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Services
{
    public class QrCodeService : IQrCodeService
    {
        private readonly ApplicationDbContext _context;

        public QrCodeService(ApplicationDbContext context)
        {
            _context = context;
        }

        private string GenerateUniqueUrl()
        {
            using (var generator = RandomNumberGenerator.Create())
            {
                byte[] data = new byte[16];
                generator.GetBytes(data);
                return Convert.ToBase64String(data)
                    .Replace("/", "")
                    .Replace("+", "")
                    .Replace("=", "")
                    .Substring(0, 20);
            }
        }

        public async Task<QRCodeDto> CreateQRCode(QRCodeDto qrCodeDto)
        {
            // Generate a unique URL
            var uniqueUrl = $"http://localhost:5173/public-petcard/{GenerateUniqueUrl()}";

            // Generate the QR code image
            using var qrGenerator = new QRCodeGenerator();
            var qrCodeData = qrGenerator.CreateQrCode(uniqueUrl, QRCodeGenerator.ECCLevel.Q);
            var qrCode = new PngByteQRCode(qrCodeData);
            var qrCodeBytes = qrCode.GetGraphic(20);

            // Create a QR code model and save it
            var qrCodeModel = new QRCode
            {
                QRCodeData = uniqueUrl,
                QRCodeImage = Convert.ToBase64String(qrCodeBytes),
                DateCreated = DateTime.Now,
                IsActive = true
            };

            _context.QRCodes.Add(qrCodeModel);
            await _context.SaveChangesAsync();

            // Return the saved QR code data
            return new QRCodeDto
            {
                QRCodeID = qrCodeModel.QRCodeID,
                QRCodeData = qrCodeModel.QRCodeData,
                QRCodeImage = qrCodeModel.QRCodeImage,
                DateGenerated = qrCodeModel.DateCreated
            };
        }

        public async Task<QRCodeDto> GetQRCodeById(int qrCodeId)
        {
            var qrCode = await _context.QRCodes.FindAsync(qrCodeId);
            if (qrCode == null) return null;

            return new QRCodeDto
            {
                QRCodeID = qrCode.QRCodeID,
                QRCodeData = qrCode.QRCodeData,
                QRCodeImage = qrCode.QRCodeImage,
                IsScannedForFirstTime = qrCode.IsScannedForFirstTime,
                IsActive = qrCode.IsActive,
                IsDeleted = qrCode.IsDeleted,
                DateGenerated = qrCode.DateGenerated,
                PetProfileID = qrCode.PetProfile?.PetID
            };
        }

        public async Task<bool> DeactivateQRCode(int qrCodeId)
        {
            var qrCode = await _context.QRCodes.FindAsync(qrCodeId);
            if (qrCode == null) return false;

            qrCode.IsActive = false;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ScanQRCode(int qrCodeId)
        {
            var qrCode = await _context.QRCodes.FindAsync(qrCodeId);
            if (qrCode == null || qrCode.IsScannedForFirstTime == true)
                return false;

            qrCode.IsScannedForFirstTime = true;
            qrCode.DateModified = DateTime.Now;

            await _context.SaveChangesAsync();
            return true;
        }
    }
}
