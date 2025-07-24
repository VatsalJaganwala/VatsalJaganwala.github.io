// Portfolio Data Manager
class PortfolioData {
    constructor() {
        this.data = null;
        this.loadData();
    }

    async loadData() {
        try {
            const response = await fetch('data/portfolio.json');
            this.data = await response.json();
            this.populateData();
        } catch (error) {
            console.error('Error loading portfolio data:', error);
        }
    }

    populateData() {
        if (!this.data) return;

        this.populatePersonalInfo();
        this.populateSkills();
        this.populateEducation();
        this.populateExperience();
        this.populateAwards();
        this.populateProjects();
        this.populateContact();
        this.updateMetaTags();
    }

    populatePersonalInfo() {
        const { personal_info } = this.data;
        
        // Update page title
        document.title = personal_info.name;
        
        // Update navbar brand
        document.querySelectorAll('.navbar-brand h1').forEach(el => {
            el.textContent = personal_info.name;
        });
        
        // Update header section
        const headerName = document.querySelector('#home h1.display-3');
        if (headerName) headerName.textContent = personal_info.name;
        
        const headerTitle = document.querySelector('#home .typed-text');
        if (headerTitle) headerTitle.textContent = `${personal_info.title}, Flutter Development, Cross-Platform Development`;
        
        const headerSummary = document.querySelector('#home p.mb-4');
        if (headerSummary) headerSummary.textContent = personal_info.profile_summary;
        
        // Update resume link
        const resumeLink = document.querySelector('a[href*="drive.google.com"]');
        if (resumeLink) resumeLink.href = this.data.resume_link;
    }

    populateSkills() {
        const skillsContainer = document.querySelector('#skill .row.align-items-center');
        if (!skillsContainer) return;

        const { technical_skills } = this.data;
        
        // Clear existing skills
        skillsContainer.innerHTML = '';
        
        // Create skills in two columns
        const leftColumn = document.createElement('div');
        leftColumn.className = 'col-md-6';
        
        const rightColumn = document.createElement('div');
        rightColumn.className = 'col-md-6';
        
        technical_skills.forEach((skill, index) => {
            const skillElement = this.createSkillElement(skill);
            if (index < Math.ceil(technical_skills.length / 2)) {
                leftColumn.appendChild(skillElement);
            } else {
                rightColumn.appendChild(skillElement);
            }
        });
        
        skillsContainer.appendChild(leftColumn);
        skillsContainer.appendChild(rightColumn);
    }

    createSkillElement(skill) {
        const skillDiv = document.createElement('div');
        skillDiv.className = 'skill mb-4';
        
        skillDiv.innerHTML = `
            <div class="d-flex justify-content-between">
                <h6 class="font-weight-bold">${skill.name}</h6>
                <h6 class="font-weight-bold">${skill.level}%</h6>
            </div>
            <div class="progress">
                <div class="progress-bar bg-primary" role="progressbar" aria-valuenow="${skill.level}" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>
            </div>
        `;
        
        // Animate progress bar after a short delay
        setTimeout(() => {
            const progressBar = skillDiv.querySelector('.progress-bar');
            if (progressBar) {
                progressBar.style.width = `${skill.level}%`;
            }
        }, 100);
        
        return skillDiv;
    }

    populateEducation() {
        const educationTab = document.querySelector('#tab-1 .row');
        if (!educationTab) return;

        const { education } = this.data;
        educationTab.innerHTML = '';
        
        education.forEach(edu => {
            const eduElement = document.createElement('div');
            eduElement.className = 'col-sm-6';
            
            eduElement.innerHTML = `
                <h5>${edu.degree}</h5>
                <hr class="text-primary my-2">
                <p class="text-primary mb-1">${edu.duration}</p>
                <h6 class="mb-0">${edu.institution}</h6>
                ${edu.cgpa ? `<p class="mb-0">CGPA: ${edu.cgpa}</p>` : ''}
            `;
            
            educationTab.appendChild(eduElement);
        });
    }

    populateExperience() {
        // Add experience section to skills area if needed
        const skillsSection = document.querySelector('#skill .container .row');
        if (!skillsSection) return;

        const { experience } = this.data;
        
        // Check if experience section already exists
        let experienceSection = document.querySelector('#experience-section');
        if (!experienceSection) {
            experienceSection = document.createElement('div');
            experienceSection.id = 'experience-section';
            experienceSection.className = 'col-lg-12 mt-5';
            
            experienceSection.innerHTML = `
                <h3 class="mb-4">Experience</h3>
                <div id="experience-content"></div>
            `;
            
            skillsSection.appendChild(experienceSection);
        }
        
        const experienceContent = document.querySelector('#experience-content');
        experienceContent.innerHTML = '';
        
        experience.forEach(exp => {
            const expElement = document.createElement('div');
            expElement.className = 'mb-4';
            
            const responsibilities = exp.responsibilities.map(resp => `<li>${resp}</li>`).join('');
            
            expElement.innerHTML = `
                <div class="border-start border-primary ps-4">
                    <h5>${exp.title}</h5>
                    <h6 class="text-primary">${exp.company} - ${exp.location}</h6>
                    <p class="text-muted mb-2">${exp.duration}</p>
                    <ul class="mb-0">${responsibilities}</ul>
                </div>
            `;
            
            experienceContent.appendChild(expElement);
        });
    }

    populateProjects() {
        const projectsContainer = document.querySelector('.portfolio-container');
        if (!projectsContainer) return;

        const { projects } = this.data;
        projectsContainer.innerHTML = '';
        
        projects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.className = 'col-lg-4 col-md-6 portfolio-item';
            
            const platforms = project.platforms.join(', ');
            const technologies = project.technologies.join(', ');
            
            projectElement.innerHTML = `
                <div class="portfolio-img rounded overflow-hidden">
                    <img class="img-fluid" src="${project.image}" alt="${project.title}">
                    <div class="portfolio-btn">
                        <a class="btn btn-lg-square btn-outline-secondary border-2 mx-1" 
                           href="${project.image}" data-lightbox="portfolio" title="View Image">
                            <i class="fa fa-eye"></i>
                        </a>
                        ${project.github ? `
                            <a class="btn btn-lg-square btn-outline-secondary border-2 mx-1" 
                               href="${project.github}" target="_blank" title="GitHub">
                                <i class="fa fa-github"></i>
                            </a>
                        ` : ''}
                        ${project.demo ? `
                            <a class="btn btn-lg-square btn-outline-secondary border-2 mx-1" 
                               href="${project.demo}" target="_blank" title="Live Demo">
                                <i class="fa fa-link"></i>
                            </a>
                        ` : ''}
                    </div>
                    <div class="portfolio-overlay">
                        <h5 class="text-white">${project.title}</h5>
                        <p class="text-white-50">${platforms}</p>
                        <p class="text-white-50 small">${technologies}</p>
                        <p class="text-white-50 small">${project.description.substring(0, 100)}...</p>
                    </div>
                </div>
            `;
            
            projectsContainer.appendChild(projectElement);
        });
    }

    populateContact() {
        const { personal_info, social_links } = this.data;
        
        // Update phone number
        const phoneLink = document.querySelector('a[href^="tel:"]');
        if (phoneLink) {
            phoneLink.href = `tel:${personal_info.phone}`;
            phoneLink.textContent = personal_info.phone;
        }
        
        // Update email
        const emailLink = document.querySelector('a[href^="mailto:"]');
        if (emailLink) {
            emailLink.href = `mailto:${personal_info.email}`;
            emailLink.textContent = personal_info.email;
        }
        
        // Update social links
        const socialContainer = document.querySelector('#contact .d-flex.pt-2');
        if (socialContainer && social_links) {
            socialContainer.innerHTML = `
                <a class="btn btn-square btn-primary me-2" href="${social_links.linkedin}" target="_blank">
                    <i class="fab fa-linkedin-in"></i>
                </a>
                <a class="btn btn-square btn-primary me-2" href="${social_links.github}" target="_blank">
                    <i class="fab fa-github"></i>
                </a>
                <a class="btn btn-square btn-primary me-2" href="${social_links.email}">
                    <i class="fa fa-envelope"></i>
                </a>
            `;
        }
    }

    populateAwards() {
        const { awards } = this.data;
        if (!awards || awards.length === 0) return;

        // Add awards section after experience
        const experienceSection = document.querySelector('#experience-section');
        if (experienceSection) {
            const awardsSection = document.createElement('div');
            awardsSection.className = 'col-lg-12 mt-5';
            
            awardsSection.innerHTML = `
                <h3 class="mb-4">Awards & Recognition</h3>
                <div id="awards-content"></div>
            `;
            
            experienceSection.parentNode.appendChild(awardsSection);
            
            const awardsContent = document.querySelector('#awards-content');
            awards.forEach(award => {
                const awardElement = document.createElement('div');
                awardElement.className = 'mb-3 border-start border-warning ps-4';
                
                awardElement.innerHTML = `
                    <h5>${award.title}</h5>
                    <h6 class="text-warning">${award.organization}</h6>
                    <p class="text-muted mb-1">${award.date}</p>
                    <p class="mb-0">${award.description}</p>
                `;
                
                awardsContent.appendChild(awardElement);
            });
        }
    }

    updateMetaTags() {
        const { personal_info } = this.data;
        
        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.content = personal_info.profile_summary;
        }
        
        // Update meta keywords
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
            metaKeywords.content = `${personal_info.name}, Flutter Developer, Mobile App Development, Cross-Platform Development`;
        }
    }
}

// Initialize portfolio data when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new PortfolioData();
});