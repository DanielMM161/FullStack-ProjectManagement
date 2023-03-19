using System.Security.Claims;
using System.Security.Principal;
using backend.src.Models;
using backend.src.Repositories.ProjectRepo;

namespace backend.src.Helpers;

public interface IClaimsPrincipalService
{
    ClaimsPrincipal GetClaim();
    int GetUserId();
    Task<Project> IsProjectExist(int projectId, IProjectRepo projectRepo);
    Task CheckUserBelongProject(Project project);
}