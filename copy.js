// Adds a copy button to every <pre> block that copies its content to clipboard
(function(){
  function addButtons(){
    document.querySelectorAll('pre').forEach(pre => {
      // avoid adding multiple buttons
      if (pre.querySelector('.copy-btn')) return;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'copy-btn';
      btn.textContent = 'Copy';
      pre.appendChild(btn);

      btn.addEventListener('click', async () => {
        const codeEl = pre.querySelector('code');
        const text = codeEl ? codeEl.textContent : pre.textContent;
        try{
          await navigator.clipboard.writeText(text);
          btn.classList.add('copied');
          btn.textContent = 'Copied';
        }catch(e){
          // fallback for older browsers
          const ta = document.createElement('textarea');
          ta.value = text;
          document.body.appendChild(ta);
          ta.select();
          try{ document.execCommand('copy'); btn.classList.add('copied'); btn.textContent='Copied'; }catch(_){ btn.textContent='Copy failed'; }
          ta.remove();
        }
        setTimeout(()=>{ btn.classList.remove('copied'); btn.textContent='Copy'; }, 1400);
      });
    });
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', addButtons);
  } else addButtons();
})();
