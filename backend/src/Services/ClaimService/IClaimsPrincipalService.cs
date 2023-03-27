namespace backend.src.Helpers;

using System.Security.Claims;
using backend.src.Models;
using backend.src.Repositories.ProjectRepo;

public interface IClaimsPrincipalService
{
    ClaimsPrincipal GetClaim();
    int GetUserId();
    Task<Project> IsProjectExist(int projectId, IProjectRepo projectRepo);
    Task CheckUserBelongProject(Project project);
}