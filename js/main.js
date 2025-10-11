// Atari 2600 Course Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Navigation toggle for mobile
    const navToggle = document.getElementById('navToggle');
    const navList = document.querySelector('.nav-list');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
        });
    }

    // Add copy buttons to code blocks
    addCopyButtons();
    
    // Highlight assembly syntax
    highlightAssembly();
    
    // Add retro sound effects (optional)
    //addSoundEffects();
});

function addCopyButtons() {
    const codeBlocks = document.querySelectorAll('.code-block');
    
    codeBlocks.forEach(block => {
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.textContent = 'COPY';
        copyBtn.setAttribute('data-tooltip', 'Copy code to clipboard');
        
        copyBtn.addEventListener('click', function() {
            const code = block.querySelector('pre').textContent;
            
            navigator.clipboard.writeText(code).then(function() {
                copyBtn.textContent = 'COPIED!';
                copyBtn.classList.add('copied');
                
                setTimeout(() => {
                    copyBtn.textContent = 'COPY';
                    copyBtn.classList.remove('copied');
                }, 2000);
            }).catch(function(err) {
                console.error('Failed to copy: ', err);
                copyBtn.textContent = 'ERROR';
                setTimeout(() => {
                    copyBtn.textContent = 'COPY';
                }, 2000);
            });
        });
        
        block.appendChild(copyBtn);
    });
}

function highlightAssembly() {
    const codeBlocks = document.querySelectorAll('.code-block pre');
    
    codeBlocks.forEach(pre => {
        let code = pre.innerHTML;
        
        // 6502 Assembly syntax highlighting
        code = code
            // Instructions
            .replace(/\b(LDA|LDX|LDY|STA|STX|STY|ADC|SBC|AND|ORA|EOR|CMP|CPX|CPY|INC|DEC|INX|DEX|INY|DEY|ASL|LSR|ROL|ROR|BIT|JMP|JSR|RTS|RTI|BEQ|BNE|BCS|BCC|BMI|BPL|BVS|BVC|CLC|SEC|CLI|SEI|CLV|CLD|SED|TAX|TAY|TXA|TYA|TSX|TXS|PHA|PLA|PHP|PLP|NOP|BRK)\b/g, '<span class="asm-instruction">$1</span>')
            // Registers
            .replace(/\b([AXY])\b/g, '<span class="asm-register">$1</span>')
            // Immediate values
            .replace(/#\$([0-9A-F]+)/g, '#<span class="asm-immediate">$$$1</span>')
            .replace(/#([0-9]+)/g, '#<span class="asm-immediate">$1</span>')
            // Memory addresses
            .replace(/\$([0-9A-F]+)/g, '<span class="asm-address">$$$1</span>')
            // Numbers
            .replace(/\b([0-9]+)\b/g, '<span class="asm-number">$1</span>')
            // Comments
            .replace(/;(.*)$/gm, '<span class="asm-comment">;$1</span>')
            // Labels
            .replace(/^([A-Za-z_][A-Za-z0-9_]*):?/gm, '<span class="asm-label">$1</span>')
            // Directives
            .replace(/\.(byte|word|org|include|processor|seg)/gi, '<span class="asm-directive">.$1</span>');
        
        pre.innerHTML = code;
    });
}

function addSoundEffects() {
    // Add subtle retro beep sounds for interactions (optional)
    const audioContext = typeof AudioContext !== 'undefined' ? AudioContext : webkitAudioContext;
    
    if (audioContext) {
        const ctx = new audioContext();
        
        function playBeep(frequency = 800, duration = 100) {
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = 'square';
            
            gainNode.gain.setValueAtTime(0, ctx.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration / 1000);
            
            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + duration / 1000);
        }
        
        // Add sound to navigation links
        document.querySelectorAll('.nav-link, .lesson-link').forEach(link => {
            link.addEventListener('mouseenter', () => playBeep(1200, 50));
        });
        
        // Add sound to copy buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('copy-btn')) {
                playBeep(1600, 150);
            }
        });
    }
}

// Lesson navigation
function goToLesson(lessonNumber) {
    window.location.href = `lessons/lesson-${lessonNumber}.html`;
}

// Progress tracking (can be enhanced with localStorage)
function markLessonComplete(lessonNumber) {
    localStorage.setItem(`lesson-${lessonNumber}-complete`, 'true');
    updateProgressIndicator();
}

function updateProgressIndicator() {
    // Update progress bar or indicators
    const totalLessons = 12;
    let completedLessons = 0;
    
    for (let i = 1; i <= totalLessons; i++) {
        if (localStorage.getItem(`lesson-${i}-complete`) === 'true') {
            completedLessons++;
        }
    }
    
    const progress = (completedLessons / totalLessons) * 100;
    console.log(`Course Progress: ${progress.toFixed(1)}%`);
}