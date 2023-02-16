using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using NotesApiClassLibrary.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace NotesApi.Controllers;
[Route("api/[controller]")]
[ApiController]
public class TokenController : ControllerBase
{
	private readonly UserManager<IdentityUser> _userManger;
	private readonly IConfiguration _config;

	public TokenController( UserManager<IdentityUser> userManger , 
		IConfiguration config)
	{
		_userManger = userManger;
		_config = config;
	}

	[HttpPost]
	[Route("/token")]
	public async Task<IActionResult> CreateToken(string email , string password)
	{
		if ( await UserValidation(email , password))
		{
			return new ObjectResult(await GenerateToken(email));
		}
		return BadRequest();
	}

	private async Task<bool> UserValidation(string email , string password)
	{
		var user = await _userManger.FindByEmailAsync(email);
		return await _userManger.CheckPasswordAsync(user, password);
	}

	private async Task<string> GenerateToken(string email)
	{
		var user = await _userManger.FindByEmailAsync(email);

		List<Claim> claims = new List<Claim>
		{
			new Claim(ClaimTypes.Email, user.Email),
			new Claim(ClaimTypes.Name , user.UserName),
			new Claim(ClaimTypes.NameIdentifier , user.Id)
		};

		var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
			   _config.GetValue<string>("Secrets:SecurityKey")));

		var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

		var token = new JwtSecurityToken(
			claims: claims,
			expires: DateTime.Now.AddDays(14),
			signingCredentials:creds
			);

		var jwt = new JwtSecurityTokenHandler().WriteToken(token);

		return jwt;
	}
}
