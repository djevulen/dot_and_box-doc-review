import * as Prism from './prism.js'

class DABLEditor extends HTMLElement {
    static observedAttributes = ["code", "readonly", 'attach-selector']

    // noinspection JSUnusedGlobalSymbols
    connectedCallback() {
        this.code = ''
        const shadow = this.attachShadow({mode: "open"})
        shadow.innerHTML = `
      <link href="./lib/prism.css" rel="stylesheet" type="text/css">  

      <style>
        :host { display: block;  padding: 0; border: 1px solid #ccc ;}
        .main-wrapper {
          overflow: auto;
        }
        .editor {
            line-height:1.2em;
            background-size:2.4em 2.4em;
            background-origin:content-box;
            counter-reset: line;
            margin-top: 5px;
            padding-left: 10px;
            text-align:justify;
            font-family: monospace;
            /*resize: both;*/
            overflow: auto;
            width: max-content
        }
        
       [contenteditable]:focus { 
            outline: 0 solid transparent; 
        } 
        
        .main-menu {
           height: 30px;
           margin-top: 0;
           margin-left: 0;
           width: max-content
           position: absolute;
           display: flex;           
           background-color: rgba(243,243,243,0.7);
        }
        .separator {
          flex-grow:1;
        }
        .right-menu {
            flex-grow: ;
            display: flex;          
            width: max-content            
        }
        .main-menu  button {
          border: 1px solid transparent;
          background-color: transparent;
        }
        .main-menu  button:hover {
          border: 1px solid lightgray ;
        }
        .editor .token {
            font-weight: bold;
        }
      </style>
      <script src="./prism.js"></script>
      <div class="main-menu">             
          <button id="run-code" title="run code">▶</button>
          <span class="separator"></span>
          <div class="right-menu"><button id="copy-clipboard" title="copy to clipboard" >📋</button></div> 
        </div>
      <div class="main-wrapper">      
        <pre class="editor" spellcheck=false contenteditable></pre>
      </div>
     `
        const clipBoardButton = this.shadowRoot.querySelector('#copy-clipboard')
        clipBoardButton.onclick = (_) => this.copyToClipBoard(this.code)

        const runCodeButton = this.shadowRoot.querySelector('#run-code')
        runCodeButton.onclick = (_) => this.dotsAndBoxes.code = this.updateCodeFromEditor()

        this.extendDABLang()
        this.updateAttachedControl()
        this.updateCode()
        this.updateReadonly()
    }

    extendDABLang() {
        window.Prism.languages['dabl'] = window.Prism.languages.extend('clike', {
            'keyword': /\b(?:steps|title|selected|box|dot)\b/,
        });
    }

    copyToClipBoard(txt) {
        this.updateCodeFromEditor()
        navigator.clipboard.writeText(txt);
    }

    updateCodeFromEditor() {
        const editor = this.getEditor()
        this.code = editor.innerText
        return this.code
    }

    getEditor(){
        return this.shadowRoot.querySelector('.editor')
    }

    updateCode() {
        if (this.shadowRoot) {
            const editor = this.getEditor()
            editor.innerHTML = window.Prism.highlight(this.code, window.Prism.languages.dabl, 'dabl')
        }
    }

    updateReadonly() {
        if (this.shadowRoot && this.readonly) {
            const editor = this.shadowRoot.querySelector('.editor')
            editor.removeAttribute("contenteditable")
        }
    }

    updateAttachedControl() {
        if (this.shadowRoot && this.attachSelector) {
            const dab = document.querySelector(this.attachSelector)
            if (dab) {
                this.dotsAndBoxes = dab
                this.reattachHandler()
            }
            if (this.dotsAndBoxes && this.dotsAndBoxes.initialized) {
                this.code = this.dotsAndBoxes.code
                this.updateCode()
            }
        }
    }

    reattachHandler(){
        document.removeEventListener("initialized", this.initializeHandler)
        document.addEventListener("initialized", this.initializeHandler)
    }

    initializeHandler = (evt) => this.onAttachedControlInitialize(evt)

    onAttachedControlInitialize(evt) {
        if (evt.target === this.dotsAndBoxes) {
            this.code = this.dotsAndBoxes.code
            this.updateCode()
        }
    }

    // noinspection JSUnusedGlobalSymbols
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'code') {
            this.code = newValue
            this.updateCode()
        }
        if (name === 'readonly') {
            this.readonly = newValue != null
            this.updateReadonly()
        }

        if (name === 'attach-selector') {
            this.attachSelector = newValue
            this.updateReadonly()
        }

    }

}

customElements.define('dabl-editor', DABLEditor)