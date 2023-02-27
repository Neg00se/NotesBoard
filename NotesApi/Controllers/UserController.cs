using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NotesApi.Data;
using NotesApi.Models;
using NotesApiClassLibrary.Data;
using NotesApiClassLibrary.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace NotesApi.Controllers;
[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
	private readonly UserManager<IdentityUser> _userManager;
	private readonly NotesDbContext _db;

	public UserController( UserManager<IdentityUser> userManager,
		NotesDbContext db)
	{
		_userManager = userManager;
		_db = db;
	}

	[HttpPost]
	[Route("/register")]
	public async Task<IActionResult> Register(UserRegistrationModel user)
	{

		var existingUser = await _userManager.FindByEmailAsync(user.Email);

		if (existingUser is null)
		{
			IdentityUser newUser = new()
			{
				Email = user.Email,
				EmailConfirmed = true,
				UserName = user.Name

			};

			IdentityResult result = await _userManager.CreateAsync(newUser, user.Password);

			if (result.Succeeded)
			{
				existingUser = await _userManager.FindByEmailAsync(user.Email);

				User u = new()
				{
					Id = existingUser.Id,
					Name = existingUser.UserName,
					Email = existingUser.Email
				};

				_db.Users.Add(u);
				 await _db.SaveChangesAsync();
				return Ok(await _db.Users.FindAsync(u.Id));
			}
			
		}

		return BadRequest();

		
	}

}
