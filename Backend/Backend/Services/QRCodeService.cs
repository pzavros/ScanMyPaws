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
            if (string.IsNullOrEmpty(qrCodeDto.QRCodeData))
                throw new ArgumentException("QRCodeData is required");

            try
            {
                using var qrGenerator = new QRCodeGenerator();
                var qrCodeData = qrGenerator.CreateQrCode(qrCodeDto.QRCodeData, QRCodeGenerator.ECCLevel.Q);
                var qrCode = new PngByteQRCode(qrCodeData);
                var qrCodeBytes = qrCode.GetGraphic(20);

                qrCodeDto.QRCodeImage = Convert.ToBase64String(qrCodeBytes);

                var qrCodeModel = new QRCode
                {
                    QRCodeData = qrCodeDto.QRCodeData,
                    QRCodeImage = qrCodeDto.QRCodeImage,
                    IsScannedForFirstTime = qrCodeDto.IsScannedForFirstTime,
                    IsActive = qrCodeDto.IsActive,
                    IsDeleted = qrCodeDto.IsDeleted,
                    DateGenerated = DateTime.Now
                };

                _context.QRCodes.Add(qrCodeModel);
                await _context.SaveChangesAsync();

                qrCodeDto.QRCodeID = qrCodeModel.QRCodeID;
                return qrCodeDto;
            }
            catch (Exception ex)
            {
                throw new ApplicationException("An error occurred while generating the QR code", ex);
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