// Dynamic Lesson Loader for Atari 2600 Course

class LessonLoader {
    constructor() {
        this.currentLesson = null;
        this.lessonData = null;
    }

    async init() {
        // Get lesson ID from URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const lessonId = urlParams.get('id') || '1';
        
        try {
            await this.loadLesson(lessonId);
        } catch (error) {
            this.showError();
            console.error('Failed to load lesson:', error);
        }
    }

    async loadLesson(lessonId) {
        const loadingIndicator = document.getElementById('loadingIndicator');
        const lessonContainer = document.getElementById('lessonContainer');
        const errorContainer = document.getElementById('errorContainer');

        // Show loading state
        loadingIndicator.style.display = 'block';
        lessonContainer.style.display = 'none';
        errorContainer.style.display = 'none';

        try {
            // Fetch YAML content
            const response = await fetch(`../content/lesson-${lessonId}.yaml`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const yamlText = await response.text();
            this.lessonData = jsyaml.load(yamlText);
            this.currentLesson = lessonId;
            
            // Populate the lesson content
            this.populateLesson();
            
            // Update navigation
            this.updateNavigation();
            
            // Hide loading and show content
            loadingIndicator.style.display = 'none';
            lessonContainer.style.display = 'block';
            
        } catch (error) {
            this.showError();
            throw error;
        }
    }

    populateLesson() {
        const lesson = this.lessonData.lesson;
        
        // Update page title and meta
        document.getElementById('page-title').textContent = `${lesson.title} - Atari 2600 Course`;
        document.getElementById('lessonTitle').textContent = `Lesson ${lesson.number}: ${lesson.title}`;
        document.getElementById('lessonSubtitle').textContent = lesson.subtitle;
        
        // Update video
        if (lesson.video_url) {
            document.getElementById('videoFrame').src = lesson.video_url;
            document.getElementById('videoContainer').style.display = 'block';
        } else {
            document.getElementById('videoContainer').style.display = 'none';
        }
        
        // Update navigation active state
        this.updateActiveNavLink();
        
        // Populate sections
        this.populateSections();
    }

    populateSections() {
        const sectionsContainer = document.getElementById('sectionsContainer');
        sectionsContainer.innerHTML = '';
        
        if (!this.lessonData.sections) return;
        
        this.lessonData.sections.forEach(section => {
            const sectionElement = this.createSection(section);
            sectionsContainer.appendChild(sectionElement);
        });
    }

    createSection(section) {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'lesson-section';
        
        // Section title
        if (section.title) {
            const titleElement = document.createElement('h3');
            titleElement.textContent = section.title;
            sectionDiv.appendChild(titleElement);
        }
        
        // Section content
        if (section.content) {
            const contentParagraphs = section.content.split('\n\n');
            contentParagraphs.forEach(paragraph => {
                if (paragraph.trim()) {
                    const p = document.createElement('p');
                    p.innerHTML = this.parseMarkdown(paragraph.trim());
                    sectionDiv.appendChild(p);
                }
            });
        }
        
        // Lists (unordered)
        if (section.list) {
            const ul = document.createElement('ul');
            ul.style.cssText = 'font-size: 1rem; line-height: 1.8; margin: 20px 0; padding-left: 30px; font-family: var(--readable-font);';
            section.list.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = this.parseMarkdown(item);
                ul.appendChild(li);
            });
            sectionDiv.appendChild(ul);
        }
        
        // Ordered lists
        if (section.ordered_list) {
            const ol = document.createElement('ol');
            ol.style.cssText = 'font-size: 1rem; line-height: 1.8; margin: 20px 0; padding-left: 30px; font-family: var(--readable-font);';
            section.ordered_list.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = this.parseMarkdown(item);
                ol.appendChild(li);
            });
            sectionDiv.appendChild(ol);
        }
        
        // Code blocks
        if (section.code_blocks) {
            section.code_blocks.forEach(codeBlock => {
                const codeElement = this.createCodeBlock(codeBlock);
                sectionDiv.appendChild(codeElement);
            });
        }
        
        // Content after code
        if (section.content_after_code) {
            const p = document.createElement('p');
            p.innerHTML = this.parseMarkdown(section.content_after_code);
            sectionDiv.appendChild(p);
        }
        
        // Images
        if (section.images) {
            section.images.forEach(image => {
                const img = document.createElement('img');
                img.src = image.src;
                img.alt = image.alt;
                img.className = 'lesson-image';
                if (image.style) {
                    img.style.cssText = image.style;
                }
                sectionDiv.appendChild(img);
            });
        }
        
        return sectionDiv;
    }

    createCodeBlock(codeBlock) {
        const codeDiv = document.createElement('div');
        codeDiv.className = 'code-block';
        
        const pre = document.createElement('pre');
        const code = document.createElement('code');
        code.textContent = codeBlock.content;
        pre.appendChild(code);
        codeDiv.appendChild(pre);
        
        return codeDiv;
    }

    parseMarkdown(text) {
        // Simple markdown parsing for bold text
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code style="background: var(--atari-dark); color: var(--retro-green); padding: 2px 4px; font-family: monospace;">$1</code>');
    }

    updateNavigation() {
        const navigation = this.lessonData.navigation;
        if (!navigation) return;
        
        const prevLink = document.getElementById('prevLink');
        const nextLink = document.getElementById('nextLink');
        
        if (navigation.previous) {
            prevLink.textContent = `← ${navigation.previous.title}`;
            prevLink.href = navigation.previous.url;
            prevLink.style.display = 'inline-block';
        } else {
            prevLink.style.display = 'none';
        }
        
        if (navigation.next) {
            nextLink.textContent = `${navigation.next.title} →`;
            nextLink.href = navigation.next.url;
            nextLink.style.display = 'inline-block';
        } else {
            nextLink.style.display = 'none';
        }
    }

    updateActiveNavLink() {
        // Remove active class from all nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to current lesson
        const currentNavLink = document.querySelector(`a[href="lesson.html?id=${this.currentLesson}"]`);
        if (currentNavLink) {
            currentNavLink.classList.add('active');
        }
    }

    showError() {
        document.getElementById('loadingIndicator').style.display = 'none';
        document.getElementById('lessonContainer').style.display = 'none';
        document.getElementById('errorContainer').style.display = 'block';
    }
}

// Initialize the lesson loader when DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
    const loader = new LessonLoader();
    await loader.init();
    
    // Re-initialize code highlighting and copy buttons
    if (typeof highlightAssembly === 'function') {
        highlightAssembly();
    }
    if (typeof addCopyButtons === 'function') {
        addCopyButtons();
    }
});