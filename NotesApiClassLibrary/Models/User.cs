using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotesApiClassLibrary.Models;

public class User
{
	[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
	public string Id { get; set; }

	[Required]
	[MaxLength(50)]
	public string Name { get; set; }

	[Required]
	[MaxLength(100)]

	public string Email { get; set; }

	[Required]
	public List<Note> UserNotes { get; set; } = new List<Note>();

}
