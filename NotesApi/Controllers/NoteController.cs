using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NotesApiClassLibrary.Data;
using NotesApiClassLibrary.Models;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace NotesApi.Controllers;
[Route("api/[controller]")]
[ApiController]
[Authorize]
public class NoteController : ControllerBase
{
	private readonly NotesDbContext _context;

	public NoteController(NotesDbContext context)
	{
		_context = context;
	}

	[HttpGet("get-all")]
	public async Task<List<Note>> GetAllUserNotes()
	{
		var user = await  _context.Users.Include(u=>u.UserNotes).FirstOrDefaultAsync(u => u.Id == User.FindFirstValue(ClaimTypes.NameIdentifier));

		if (user is not null)
		{
			return user.UserNotes;
		}
	
		return null;
	}

	[HttpGet("get/{noteId}")]
	public async Task<Note> GetNoteById(int noteId)
	{
		var note = await _context.Notes.FindAsync(noteId);
		if (note is not null)
		{
			return note; 
		}
		return null;

	}

	[HttpPost("create")]
	public async Task<IActionResult> Create(Note noteToCreate)
	{
		try
		{
			var user =await _context.Users.FirstOrDefaultAsync(u => u.Id == User.FindFirstValue(ClaimTypes.NameIdentifier));
			
			user.UserNotes.Add(noteToCreate);

			_context.Notes.Add(noteToCreate);
			await _context.SaveChangesAsync();
			return Ok();
		}
		catch (Exception ex)
		{

			return BadRequest(ex.Message);
		}

	}

	[HttpPut("update")]
	public async Task<IActionResult> Update(Note updateNote)
	{
		try
		{
			_context.Notes.Update(updateNote);
			await _context.SaveChangesAsync();
			return Ok();
		}
		catch (Exception ex)
		{

			return BadRequest(ex.Message);
		}
	}

	[HttpDelete("delete/{noteId}")]
	public async Task<IActionResult> Delete(int noteId)
	{

		var note = await _context.Notes.FindAsync(noteId);
		if (note is not null)
		{
			_context.Notes.Remove(note);
			await _context.SaveChangesAsync();
			return Ok();
		}
		return BadRequest("iten not selected");
	}
}
