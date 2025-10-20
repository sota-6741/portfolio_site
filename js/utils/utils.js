/**
 * ユーティリティ関数
 * DOM操作とCSS変数管理のヘルパー関数
 */

// DOM要素取得のショートカット
export const $ = sel => document.querySelector(sel);
export const $$ = sel => document.querySelectorAll(sel);

// CSS変数操作
export const setVar = (name, value) => document.documentElement.style.setProperty(`--${name}`, value);
export const removeVar = name => document.documentElement.style.removeProperty(`--${name}`);

// デバッグ用ログ
export const log = (message, data = null) => {
    console.log(message, data || '');
};

export const warn = (message, data = null) => {
    console.warn(message, data || '');
};

export const error = (message, data = null) => {
    console.error(message, data || '');
};