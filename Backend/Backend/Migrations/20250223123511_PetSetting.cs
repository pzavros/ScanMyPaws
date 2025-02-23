using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class PetSetting : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PetCardSettings",
                columns: table => new
                {
                    PetCardSettingId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DateCreated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateModified = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PetId = table.Column<int>(type: "int", nullable: false),
                    PetName = table.Column<bool>(type: "bit", nullable: false),
                    BreedName = table.Column<bool>(type: "bit", nullable: false),
                    Sex = table.Column<bool>(type: "bit", nullable: false),
                    Age = table.Column<bool>(type: "bit", nullable: false),
                    Weight = table.Column<bool>(type: "bit", nullable: false),
                    MobilePhone1 = table.Column<bool>(type: "bit", nullable: false),
                    MobilePhone2 = table.Column<bool>(type: "bit", nullable: false),
                    Address = table.Column<bool>(type: "bit", nullable: false),
                    AlternativeContact = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PetCardSettings", x => x.PetCardSettingId);
                    table.ForeignKey(
                        name: "FK_PetCardSettings_PetProfiles_PetId",
                        column: x => x.PetId,
                        principalTable: "PetProfiles",
                        principalColumn: "PetID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PetCardSettings_PetId",
                table: "PetCardSettings",
                column: "PetId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PetCardSettings");
        }
    }
}
