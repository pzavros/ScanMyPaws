using Backend.Interfaces;
using Backend.DTOs;
using Backend.Models;
using QRCoder;
using System.IO;
using System.Threading.Tasks;
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


        public async Task<QRCodeDto> CreateQRCode(QRCodeDto qrCodeDto)
        {
            try
            {
                using var qrGenerator = new QRCodeGenerator();
                var qrCodeData = qrGenerator.CreateQrCode("", QRCodeGenerator.ECCLevel.Q);
                var qrCode = new PngByteQRCode(qrCodeData);
                var qrCodeBytes = qrCode.GetGraphic(20);

                var qrCodeModel = new QRCode
                {
                    QRCodeImage = Convert.ToBase64String(qrCodeBytes),
                    DateCreated = DateTime.Now,
                    QRCodeData = null,
                };

                _context.QRCodes.Add(qrCodeModel);
                await _context.SaveChangesAsync();

                return new QRCodeDto
                {
                    QRCodeID = qrCodeModel.QRCodeID,
                    QRCodeImage = qrCodeModel.QRCodeImage,
                    DateGenerated = qrCodeModel.DateCreated
                };
            }
            catch (Exception ex)
            {
                throw new ApplicationException("Error creating QR code", ex);
            }
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
    }
}