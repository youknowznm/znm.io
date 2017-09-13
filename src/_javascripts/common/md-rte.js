import $ from 'jquery'

/**
@param
*/
export default function initMdRte(options) {
    let $mdRte = $('.md-rte')
    let format = function(commandName, value = null) {
        console.log(document.execCommand(commandName, false, null))
    }
    let actionArr = [
        {
            abbr: 'undo',
            fullName: 'undo',
            action: () => null,
        },
        {
            abbr: 'redo',
            fullName: 'redo',
            action: () => null,
            followedBySeparator: true,
        },
        {
            abbr: 'b',
            fullName: 'bold',
            action: function() {
                format('bold')
            }
        },
        {
            abbr: 'i',
            fullName: 'italic',
            action: () => format('italic'),
        },
        {
            abbr: 'u',
            fullName: 'underline',
            action: () => format('underline'),
        },
        {
            abbr: 's',
            fullName: 'strikethrough',
            action: () => format('strikeThrough'),
            followedBySeparator: true,
        },
        {
            abbr: 'h',
            fullName: 'header',
            action: () => format('formatBlock', '<h1>'),
            textContentHTML: 'H<sub>1</sub>',
        },
        {
            abbr: 'p',
            fullName: 'paragraph',
            action: () => format('formatBlock', '<p>'),
            textContentHTML: '&#182;',
        },
        {
            abbr: 'q',
            fullName: 'quote',
            action: () => format('formatBlock', '<blockquote>'),
        },
        {
            abbr: 'code',
            fullName: 'code',
            action: () => format('formatBlock', '<pre>'),
        },
        {
            abbr: 'ol',
            fullName: 'ordered list',
            action: () => format('insertOrderedList'),
        },
        {
            abbr: 'ul',
            fullName: 'unordered list',
            action: () => format('insertUnrderedList'),
            followedBySeparator: true,
        },

        {
            abbr: 'link',
            fullName: 'link',
            action: () => null,
        },
        {
            abbr: 'image',
            fullName: 'image',
            action: () => null,
        },
        {
            abbr: 'hr',
            fullName: 'horizontal line',
            action: () => format('insertHorizontalRule'),
            followedBySeparator: true,
        },
        {
            abbr: 'clear',
            fullName: 'clear format',
            action: () => null,
        },
    ]
    let rteHTML = '<ul class="actions">'
    actionArr.forEach(function(action) {
        // 已有该行为的对应图标时，使用图标；否则用字符串标识之
        rteHTML += `
            <li data-action-abbr="${action.abbr}" class="action show-tooltip">
                ${action.textContentHTML || '<span class="icon-wrap"><i class="icon"></i></span>'}
                <p class="md-tooltip to-show-at-top">${action.fullName}</p>
            </li>
            ${action.followedBySeparator === true ? '<div class="separator"></div>' : ''}
        `
    })
    rteHTML += '</ul><div class="content" contenteditable="true" spellcheck="false"></div>'
    $mdRte
        .html(rteHTML)
        // IDEA 在可编辑区域获得焦点时，execCommand才起作用。否则返回false；而mousedown事件会夺取焦点
        // https://stackoverflow.com/questions/12525087/why-doesnt-the-document-execcommand-work-when-i-click-on-a-div
        .on('mousedown', '.action', function(evt) {
            evt.preventDefault()
        })
        .on('click', '.action', function(evt) {
            let $this = $(this)
            let _a = $this.data('actionAbbr')
            let actionObj = actionArr.find(function(item) {
                return item.abbr === _a
            })
            actionObj.action()
        })
}