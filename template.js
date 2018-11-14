// ==UserScript==
// @name         trello enhancement for ruff
// @namespace    ruff
// @version      0.1
// @description  description scaffold
// @author       jader tao
// @grant        none
// @include      https://trello.com/*
// ==/UserScript==

(() => {
    'use strict';
    const store = {
        '[userstory]': `# 背景故事
1. <内容>
2. <内容>
3. <内容>

# 用户价值
1. <内容>
2. <内容>
3. <内容>

# 业务内容
1. <内容>
2. <内容>
3. <内容>

# AC
1. <验收标准>
2. <验收标准>
3. <验收标准>

# 参考资料
<参考资料>
`, '[bug]': `## 描述
<bug描述>

## 环境
[√] test
[×] staging
[×] prod

## 用户
<账户信息或其他内容>

## 复现
1. <复现操作>
2. <复现操作>
3. <复现操作>

## 预期
<预期可作为AC>
`, '[child]': `## 母卡
<母卡链接>

## 方案
1. <内容>
2. <内容>
3. <内容>

## AC
1. <验收标准>
2. <验收标准>
3. <验收标准>
`
    }
    const transformer = () => {
        const textarea = document.querySelector('textarea.field.js-description-draft.card-back-description.autosave');
        if (textarea) {
            textarea.addEventListener('blur', () => {
                const trimmedValue = String(textarea.value).trim();
                if (store.hasOwnProperty(trimmedValue)) {
                    textarea.value = store[trimmedValue];
                }
            })
        }
    }
    window.__handler = setInterval(() => {
        const path = window.location.pathname;
        if (path.startsWith('/b/')) {
            const a = document.querySelectorAll('a.list-card.js-member-droppable');
            if (a && a.length !== 0) {
                clearInterval(window.__handler);
                Array.from(a).forEach(node => node.addEventListener('click', transformer))
            }
        } else if (path.startsWith('/c/')) {
            transformer()
        }
    }, 300)
}
)(window);
