namespace backend.Db;

using backend.Models;
using Microsoft.EntityFrameworkCore;

public static class ModelBuilderConfig
{
    public static void TaskListConfig(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TaskList>()
            .Property(s => s.CreatedAt)            
            .HasDefaultValueSql("CURRENT_TIMESTAMP");

        modelBuilder.Entity<TaskList>()
            .Property(s => s.DueDate)            
            .HasDefaultValueSql("CURRENT_TIMESTAMP");

        modelBuilder.Entity<TaskList>()
            .HasOne(t => t.Parent)
            .WithOne()
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.HasPostgresEnum<TaskList.PriorityTask>();
    }

    public static void UserConfig(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>()
            .HasMany(u => u.Creator)
            .WithOne(t => t.CreatedBy)
            .HasForeignKey(a => a.CreatedById)
            .OnDelete(DeleteBehavior.SetNull);
    }

    public static void ProjectConfig(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Project>()
            .Navigation(p => p.Lists)
            .AutoInclude();
    }
}