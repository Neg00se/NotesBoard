using Microsoft.EntityFrameworkCore;
using NotesApiClassLibrary.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotesApiClassLibrary.Data;
public class ApplicationDbContext : DbContext
{

	public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options):
		base(options)
	{

	}

	public DbSet<NoteModel> Notes { get; set; }
}
