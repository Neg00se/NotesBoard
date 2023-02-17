using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotesApiClassLibrary.Models;
public class Note
{
	public int Id { get; set; }

	[MaxLength(50)]
	public string Title { get; set; }

	[Required]
	public string Content { get; set; }

	public DateTime CreationDate { get; set; } = DateTime.Now;

	public DateTime? NotifyDate { get; set; }

	public bool Notify { get; set; } = false;
}
