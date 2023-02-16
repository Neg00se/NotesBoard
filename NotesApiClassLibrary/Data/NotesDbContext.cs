using Microsoft.EntityFrameworkCore;
using NotesApiClassLibrary.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotesApiClassLibrary.Data;
public class NotesDbContext : DbContext
{

	public NotesDbContext(DbContextOptions<NotesDbContext> options):
		base(options)
	{

	}

	public DbSet<Note> Notes { get; set; }

	public DbSet<User> Users { get;set; }
}
