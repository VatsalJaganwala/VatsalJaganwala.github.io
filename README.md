# Dynamic Portfolio Website

This is a modern, dynamic portfolio website that loads content from a JSON file, making it easy to update your information without touching the HTML code.

## Features

- **Dynamic Content Loading**: All personal information, skills, projects, and experience are loaded from a JSON file
- **Easy Updates**: Simply edit the JSON file to update your portfolio content
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with smooth animations
- **Project Showcase**: Interactive project gallery with hover effects
- **Skills Visualization**: Animated progress bars for technical skills
- **Contact Information**: Dynamic contact section with social links

## File Structure

```
├── index.html              # Main portfolio page
├── data/
│   └── portfolio.json      # Your portfolio data (EDIT THIS FILE)
├── js/
│   ├── main.js            # Original template JavaScript
│   ├── portfolio-data.js   # Dynamic content loader
│   └── create-project-images.js # Utility for creating project images
├── css/
│   ├── style.css          # Original template styles
│   └── portfolio-custom.css # Custom styles for dynamic features
├── img/                   # Images directory
├── test-portfolio.html    # Test page for JSON data validation
└── README.md             # This file
```

## How to Update Your Portfolio

### 1. Update Personal Information

Edit `data/portfolio.json` and modify the `personal_info` section:

```json
{
  "personal_info": {
    "name": "Your Name",
    "title": "Your Job Title",
    "company": "Your Company",
    "location": "Your Location",
    "email": "your.email@example.com",
    "phone": "+1234567890",
    "linkedin": "linkedin.com/in/yourprofile",
    "github": "github.com/yourusername",
    "profile_summary": "Your professional summary here..."
  }
}
```

### 2. Update Skills

Modify the `technical_skills` array with your skills and proficiency levels (0-100):

```json
{
  "technical_skills": [
    {
      "name": "JavaScript",
      "level": 85
    },
    {
      "name": "React",
      "level": 80
    }
  ]
}
```

### 3. Add Projects

Update the `projects` array with your work:

```json
{
  "projects": [
    {
      "title": "Project Name",
      "platforms": ["Web", "Mobile"],
      "description": "Detailed project description...",
      "technologies": ["React", "Node.js", "MongoDB"],
      "image": "img/project-name.jpg",
      "github": "https://github.com/username/project",
      "demo": "https://project-demo.com"
    }
  ]
}
```

### 4. Update Experience

Modify the `experience` array:

```json
{
  "experience": [
    {
      "title": "Job Title",
      "company": "Company Name",
      "location": "City, State",
      "duration": "MM/YYYY – Present",
      "responsibilities": [
        "Responsibility 1",
        "Responsibility 2"
      ]
    }
  ]
}
```

### 5. Add Awards

Update the `awards` array:

```json
{
  "awards": [
    {
      "title": "Award Name",
      "organization": "Organization",
      "date": "MM/YYYY",
      "description": "Award description..."
    }
  ]
}
```

## Testing Your Changes

1. Open `test-portfolio.html` in your browser to verify your JSON data loads correctly
2. Check for any errors in the browser console
3. Ensure all data displays properly before updating the main site

## Adding Project Images

1. Add your project images to the `img/` directory
2. Update the `image` field in your project JSON to match the filename
3. Recommended image size: 400x300 pixels
4. Supported formats: JPG, PNG, WebP

## Social Links

Update the `social_links` section in the JSON:

```json
{
  "social_links": {
    "linkedin": "https://linkedin.com/in/yourprofile",
    "github": "https://github.com/yourusername",
    "email": "mailto:your.email@example.com"
  }
}
```

## Resume Link

Update the `resume_link` in the JSON:

```json
{
  "resume_link": "https://drive.google.com/file/d/your-resume-file-id/view"
}
```

## Local Development

To run locally:

1. Use a local web server (e.g., Live Server in VS Code)
2. Or use Python: `python -m http.server 8000`
3. Or use Node.js: `npx serve .`

**Note**: The portfolio uses `fetch()` to load JSON data, which requires a web server due to CORS restrictions.

## Customization

### Colors and Styling

- Edit `css/portfolio-custom.css` for custom styles
- Modify Bootstrap classes in `index.html` for layout changes
- Update CSS variables for theme colors

### Adding New Sections

1. Add data to `portfolio.json`
2. Create a population function in `js/portfolio-data.js`
3. Call the function in the `populateData()` method
4. Add corresponding HTML structure if needed

## Troubleshooting

### Common Issues

1. **JSON not loading**: Check file path and use a web server
2. **Images not showing**: Verify image paths in JSON match actual files
3. **Animations not working**: Ensure CSS and JS files are properly linked
4. **Skills not animating**: Check that progress bars have correct structure

### Debug Mode

Open browser Developer Tools (F12) and check the Console tab for any errors.

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## License

This portfolio template is based on HTML Codex template and is free to use for personal and commercial projects.

---

**Need Help?** Check the console for errors or open `test-portfolio.html` to verify your JSON data structure.