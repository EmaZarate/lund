using Microsoft.EntityFrameworkCore;
using MoneyLaundering.Api.Domain.Entities;

namespace MoneyLaundering.Api.Data.Ef
{
    public partial class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) 
            : base(options)
        {

        }

        public virtual DbSet<Activity> Activity { get; set; }
        public virtual DbSet<ActivityRisk> ActivityRisk { get; set; }
        public virtual DbSet<Antiquity> Antiquity { get; set; }
        public virtual DbSet<Branch> Branch { get; set; }
        public virtual DbSet<BranchOffice> BranchOffice { get; set; }
        public virtual DbSet<BusinessUnit> BusinessUnit { get; set; }
        public virtual DbSet<Case> Cases { get; set; }
        public virtual DbSet<CaseDocument> CaseDocument { get; set; }
        public virtual DbSet<CaseGroup> CaseGroup { get; set; }
        public virtual DbSet<CaseType> CaseType { get; set; }
        public virtual DbSet<CaseVehicle> CaseVehicle { get; set; }
        public virtual DbSet<CategoryCost> CategoryCost { get; set; }
        public virtual DbSet<Channel> Channel { get; set; }
        public virtual DbSet<ChannelRisk> ChannelRisk { get; set; }
        public virtual DbSet<Country> Country { get; set; }
        public virtual DbSet<CoverageType> CoverageType { get; set; }
        public virtual DbSet<Document> Document{ get; set; }
        public virtual DbSet<DocumentLetterType> DocumentLetterType { get; set; }
        public virtual DbSet<DocumentType> DocumentType { get; set; }
        public virtual DbSet<DocumentVersion> DocumentVersion { get; set; }
        public virtual DbSet<FinancialProfilesDefault> FinancialProfilesDefault { get; set; }
        public virtual DbSet<FinancialProfilesDefaultLog> FinancialProfilesDefaultLog { get; set; }
        public virtual DbSet<GrayList> GrayList { get; set; }
        public virtual DbSet<GrayListDocument> GrayListDocument { get; set; }
        public virtual DbSet<LimitAccumulatedClaimsCharged> LimitAccumulatedClaimsCharged { get; set; }
        public virtual DbSet<LimitAccumulatedPremium> LimitAccumulatedPremium { get; set; }
        public virtual DbSet<LimitAssuredSum> LimitAssuredSum { get; set; }
        public virtual DbSet<LimitRefund> LimitRefund { get; set; }
        public virtual DbSet<Location> Location { get; set; }
        public virtual DbSet<LocationRisk> LocationRisk { get; set; }
        public virtual DbSet<MailType> MailType { get; set; }
        public virtual DbSet<MessageType> MessageType { get; set; }
        public virtual DbSet<News> News { get; set; }
        public virtual DbSet<NewsDocument> NewsDocument { get; set; }
        public virtual DbSet<NewsMail> NewsMail { get; set; }
        public virtual DbSet<NewsReason> NewsReason { get; set; }
        public virtual DbSet<NewsReasonType> NewsReasonType { get; set; }
        public virtual DbSet<NewsRiskChange> NewsRiskChange { get; set; }
        public virtual DbSet<NewsType> NewsType { get; set; }
        public virtual DbSet<OperatedVolume> OperatedVolume { get; set; }
        public virtual DbSet<PaymentMode> PaymentMode { get; set; }
        public virtual DbSet<PaymentModeRisk> PaymentModeRisk { get; set; }
        public virtual DbSet<Person> Person { get; set; }
        public virtual DbSet<PersonBusinessUnit> PersonBusinessUnit { get; set; }
        public virtual DbSet<PersonWareHouse> PersonWareHouse { get; set; }
        public virtual DbSet<PolicyType> PolicyType { get; set; }
        public virtual DbSet<Processes> Processes { get; set; }
        public virtual DbSet<ProcessesLog> ProcessesLog { get; set; }
        public virtual DbSet<ProductRisk> ProcessesRisk { get; set; }
        public virtual DbSet<Producer> Producer { get; set; }
        public virtual DbSet<Product> Product { get; set; }
        public virtual DbSet<Risk> Risk { get; set; }
        public virtual DbSet<RiskAssignmentRanges> RiskAssignmentRanges { get; set; }
        public virtual DbSet<RiskAssignmentRangesLog> RiskAssignmentRangesLog { get; set; }
        public virtual DbSet<Setting> Setting { get; set; }
        public virtual DbSet<SettingLog> SettingLog { get; set; }
        public virtual DbSet<State> State { get; set; }
        public virtual DbSet<Status> Status { get; set; }
        public virtual DbSet<UserProfile> UserProfile { get; set; }
        public virtual DbSet<UseType> UseType { get; set; }
        public virtual DbSet<Vehicle> Vehicle { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<UserRole> UserRole { get; set; }
        public virtual DbSet<Roles> Role { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Activity>( t =>
            {
                t.ToTable("Activity");
                t.Property(b => b.Id).HasColumnName("ActivityId");
            });

            builder.Entity<ActivityRisk>(t =>
            {
                t.ToTable("ActivityRisk");
                t.Property(b => b.Id).HasColumnName("ActivityRiskId");
            });

            builder.Entity<Antiquity>(t =>
            {
                t.ToTable("Antiquity");
                t.Property(b => b.Id).HasColumnName("AntiquityId");
            });

            builder.Entity<Branch>(t =>
            {
                t.ToTable("Branch");
                t.Property(b => b.Id).HasColumnName("BranchId");
            });

            builder.Entity<BranchOffice>(t =>
            {
                t.ToTable("BranchOffice");
                t.Property(b => b.Id).HasColumnName("BranchOfficeId");
            });

            builder.Entity<BusinessUnit>(t =>
            {
                t.ToTable("BusinessUnit");
                t.Property(b => b.Id).HasColumnName("BusinessUnitId");
            });

            builder.Entity<Case>(t =>
            {
                t.ToTable("Case");
                t.Property(b => b.Id).HasColumnName("CaseId");
                t.HasOne(p => p.Analyst).WithMany(b => b.Cases).HasForeignKey(p => p.AnalystId);
            });

            builder.Entity<CaseDocument>(t =>
            {
                t.ToTable("CaseDocument");
                t.Property(b => b.Id).HasColumnName("CaseDocumentId");
            });

            builder.Entity<CaseGroup>(t =>
            {
                t.ToTable("CaseGroup");
                t.Property(b => b.Id).HasColumnName("CaseGroupId");
            });

            builder.Entity<CaseType>(t =>
            {
                t.ToTable("CaseType");
                t.Property(b => b.Id).HasColumnName("CaseTypeId");
            });

            builder.Entity<CaseVehicle>(t =>
            {
                t.ToTable("CaseVehicle");
                t.Property(b => b.Id).HasColumnName("CaseVehicleId");
            });

            builder.Entity<CategoryCost>(t =>
            {
                t.ToTable("CategoryCost");
                t.Property(b => b.Id).HasColumnName("CategoryCostId");
            });

            builder.Entity<Channel>(t =>
            {
                t.ToTable("Channel");
                t.Property(b => b.Id).HasColumnName("ChannelId");
            });

            builder.Entity<ChannelRisk>(t =>
            {
                t.ToTable("ChannelRisk");
                t.Property(b => b.Id).HasColumnName("ChannelRiskId");
            });

            builder.Entity<Country>(t =>
            {
                t.ToTable("Country");
                t.Property(b => b.Id).HasColumnName("CountryId");
            });

            builder.Entity<CoverageType>(t =>
            {
                t.ToTable("CoverageType");
                t.Property(b => b.Id).HasColumnName("CoverageTypeId");
            });

            builder.Entity<Document>(t =>
            {
                t.ToTable("Document");
                t.Property(b => b.Id).HasColumnName("DocumentId");
            });

            builder.Entity<DocumentLetterType>(t =>
            {
                t.ToTable("DocumentLetterType");
                t.Property(b => b.Id).HasColumnName("DocumentLetterTypeId");
            });

            builder.Entity<DocumentType>(t =>
            {
                t.ToTable("DocumentType");
                t.Property(b => b.Id).HasColumnName("DocumentTypeId");
            });

            builder.Entity<DocumentVersion>(t =>
            {
                t.ToTable("DocumentVersion");
                t.Property(b => b.Id).HasColumnName("DocumentVersionId");
            });

            builder.Entity<FinancialProfilesDefault>(t =>
            {
                t.ToTable("FinancialProfilesDefault");
                t.Property(b => b.Id).HasColumnName("FinancialProfilesDefaultId");
            });

            builder.Entity<FinancialProfilesDefaultLog>(t =>
            {
                t.ToTable("FinancialProfilesDefaultLog");
                t.Property(b => b.Id).HasColumnName("FinancialProfilesDefaultLogId");
            });

            builder.Entity<GrayList>(t =>
            {
                t.ToTable("GrayList");
                t.Property(b => b.Id).HasColumnName("GrayListId");
            });

            builder.Entity<GrayListDocument>(t =>
            {
                t.ToTable("GrayListDocument");
                t.Property(b => b.Id).HasColumnName("GrayListDocumentId");
            });

            builder.Entity<LimitAccumulatedClaimsCharged>(t =>
            {
                t.ToTable("LimitAccumulatedClaimsCharged");
                t.Property(b => b.Id).HasColumnName("LimitAccumulatedClaimsChargedId");
            });

            builder.Entity<LimitAccumulatedPremium>(t =>
            {
                t.ToTable("LimitAccumulatedPremium");
                t.Property(b => b.Id).HasColumnName("LimitAccumulatedPremiumId");
            });

            builder.Entity<LimitAssuredSum>(t =>
            {
                t.ToTable("LimitAssuredSum");
                t.Property(b => b.Id).HasColumnName("LimitAssuredSumId");
            });

            builder.Entity<LimitRefund>(t =>
            {
                t.ToTable("LimitRefund");
                t.Property(b => b.Id).HasColumnName("LimitRefundId");
            });

            builder.Entity<Location>(t =>
            {
                t.ToTable("Location");
                t.Property(b => b.Id).HasColumnName("LocationId");
            });

            builder.Entity<LocationRisk>(t =>
            {
                t.ToTable("LocationRisk");
                t.Property(b => b.Id).HasColumnName("LocationRiskId");
            });

            builder.Entity<MailType>(t =>
            {
                t.ToTable("MailType");
                t.Property(b => b.Id).HasColumnName("MailTypeId");
            });

            builder.Entity<MessageType>(t =>
            {
                t.ToTable("MessageType");
                t.Property(b => b.Id).HasColumnName("MessageTypeId");
            });

            builder.Entity<News>(t =>
            {
                t.ToTable("News");
                t.Property(b => b.Id).HasColumnName("NewsId");
            });

            builder.Entity<NewsDocument>(t =>
            {
                t.ToTable("NewsDocument");
                t.Property(b => b.Id).HasColumnName("NewsDocumentId");
            });

            builder.Entity<NewsMail>(t =>
            {
                t.ToTable("NewsMail");
                t.Property(b => b.Id).HasColumnName("NewsMailId");
            });

            builder.Entity<NewsReason>(t =>
            {
                t.ToTable("NewsReason");
                t.Property(b => b.Id).HasColumnName("NewsReasonId");
            });

            builder.Entity<NewsReasonType>(t =>
            {
                t.ToTable("NewsReasonType");
                t.Property(b => b.Id).HasColumnName("NewsReasonTypeId");
            });

            builder.Entity<NewsRiskChange>(t =>
            {
                t.ToTable("NewsRiskChange");
                t.Property(b => b.Id).HasColumnName("NewsRiskChangeId");
            });

            builder.Entity<NewsType>(t =>
            {
                t.ToTable("NewsType");
                t.Property(b => b.Id).HasColumnName("NewsTypeId");
            });

            builder.Entity<OperatedVolume>(t =>
            {
                t.ToTable("OperatedVolume");
                t.Property(b => b.Id).HasColumnName("OperatedVolumeId");
            });

            builder.Entity<PaymentMode>(t =>
            {
                t.ToTable("PaymentMode");
                t.Property(b => b.Id).HasColumnName("PaymentModeId");
            });

            builder.Entity<PaymentModeRisk>(t =>
            {
                t.ToTable("PaymentModeRisk");
                t.Property(b => b.Id).HasColumnName("PaymentModeRiskId");
            });

            builder.Entity<Person>(t =>
            {
                t.ToTable("Person");
                t.Property(b => b.Id).HasColumnName("PersonId");
            });

            builder.Entity<PersonBusinessUnit>(t =>
            {
                t.ToTable("PersonBusinessUnit");
                t.Property(b => b.Id).HasColumnName("PersonBusinessUnitId");
            });

            builder.Entity<PersonWareHouse>(t =>
            {
                t.ToTable("PersonWareHouse");
                t.Property(b => b.Id).HasColumnName("PersonWareHouseId");
            });

            builder.Entity<PolicyType>(t =>
            {
                t.ToTable("PolicyType");
                t.Property(b => b.Id).HasColumnName("PolicyTypeId");
            });

            builder.Entity<Processes>(t =>
            {
                t.ToTable("Processes");
                t.Property(b => b.Id).HasColumnName("ProcessesId");
            });

            builder.Entity<ProcessesLog>(t =>
            {
                t.ToTable("ProcessesLog");
                t.Property(b => b.Id).HasColumnName("ProcessesLogId");
            });

            builder.Entity<ProductRisk>(t =>
            {
                t.ToTable("ProductRisk");
                t.Property(b => b.Id).HasColumnName("ProductRiskId");
            });

            builder.Entity<Producer>(t =>
            {
                t.ToTable("Producer");
                t.Property(b => b.Id).HasColumnName("ProducerId");
            });

            builder.Entity<Product>(t =>
            {
                t.ToTable("Product");
                t.Property(b => b.Id).HasColumnName("ProductId");
            });

            builder.Entity<Risk>(t =>
            {
                t.ToTable("Risk");
                t.Property(b => b.Id).HasColumnName("RiskId");
            });

            builder.Entity<RiskAssignmentRanges>(t =>
            {
                t.ToTable("RiskAssignmentRanges");
                t.Property(b => b.Id).HasColumnName("RiskAssignmentRangesId");
            });

            builder.Entity<RiskAssignmentRangesLog>(t =>
            {
                t.ToTable("RiskAssignmentRangesLog");
                t.Property(b => b.Id).HasColumnName("RiskAssignmentRangesLogId");
            });

            builder.Entity<Setting>(t =>
            {
                t.ToTable("Setting");
                t.Property(b => b.Id).HasColumnName("SettingId");
            });

            builder.Entity<SettingLog>(t =>
            {
                t.ToTable("SettingLog");
                t.Property(b => b.Id).HasColumnName("SettingLogId");
            });

            builder.Entity<State>(t =>
            {
                t.ToTable("State");
                t.Property(b => b.Id).HasColumnName("StateId");
            });


            builder.Entity<Status>(t =>
            {
                t.ToTable("Status");
                t.Property(b => b.Id).HasColumnName("StatusId");
            });

            builder.Entity<UserProfile>(t =>
            {
                t.ToTable("UserProfile");
                t.Property(b => b.Id).HasColumnName("UserProfileId");
            });

            builder.Entity<UseType>(t =>
            {
                t.ToTable("UseType");
                t.Property(b => b.Id).HasColumnName("UseTypeId");
            });

            builder.Entity<Vehicle>(t =>
            {
                t.ToTable("Vehicle");
                t.Property(b => b.Id).HasColumnName("VehicleId");
            });

            builder.Entity<User>(t =>
            {
                t.ToTable("Users");
                t.Property(b => b.UserId).HasColumnName("UserId");
            });

            builder.Entity<Roles>(t =>
            {
                t.ToTable("Roles");
                t.Property(b => b.RoleId).HasColumnName("RolesId");
                t.HasKey(hk => new { hk.RoleId });
            });

            builder.Entity<UserRole>(t =>
            {
                t.ToTable("UserRoles");
                t.HasKey(hk => new { hk.UserId, hk.RoleId, hk.ApplicationId });
                t.HasOne(p => p.Role).WithMany(b => b.UserRoles).HasForeignKey(p => p.RoleId);
                t.HasOne(p => p.User).WithMany(b => b.UserRoles).HasForeignKey(p => p.UserId);

            });
        }
    }
}
