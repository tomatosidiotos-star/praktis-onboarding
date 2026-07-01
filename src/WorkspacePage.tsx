import React, { useState, useRef, useEffect } from 'react';
import type { CurrentUser } from './types';
import * as api from './api';
import logoUrl from './logo.svg';

import navShowcase   from './nav-showcase.svg';
import navProfile    from './nav-profile.svg';
import navCompanies  from './nav-companies.svg';
import navUsers      from './nav-users.svg';
import navRoles      from './nav-roles.svg';
import navCatalogIs  from './nav-catalog-is.svg';
import navRequests   from './nav-requests.svg';
import navBilling    from './nav-billing.svg';

import imgMiObjects from './mi-objects.png';
import imgMiRefs    from './mi-refs.png';
import imgMiLkk     from './mi-lkk.png';
import imgMiKs      from './mi-ks.png';
import imgMiMc      from './mi-mc.png';
import imgMiIcona   from './mi-icona.png';
import imgMiId      from './mi-id.png';
import imgMiEtp     from './mi-etp.png';
import imgMiPir     from './mi-pir.png';

// ─── Токены ──────────────────────────────────────────────────────────────────

const C = {
  bgPage:          '#f5f8fb',
  white:           '#ffffff',
  primary:         '#3c83f6',
  primaryLight:    '#eff5fe',
  textPrimary:     '#41484a',
  textSecondary:   '#66788c',
  textMuted:       '#7e7e7e',
  avatarBg:        '#aabcce',
  borderDefault:   '#dddddd',
  borderLight:     '#eef3f9',
  buttonSecondary: '#eef3f9',
  successBg:       '#ebfddc',
  successText:     '#72bf2f',
};

const R = { sm: 6, md: 8, lg: 12 };

const font = (size: number, weight: 400 | 500 | 600 = 400): React.CSSProperties => ({
  fontFamily: "'Inter', sans-serif",
  fontSize: size,
  fontWeight: weight,
  lineHeight: 1.2,
});

// ─── Кнопки (токены из Figma UI-kit, node 57-2137) ───────────────────────────

function BtnPrimary({ children, onClick, disabled, style }: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}) {
  const [hov, setHov] = React.useState(false);
  const [prs, setPrs] = React.useState(false);
  const bg = disabled ? '#c5d8fd' : prs ? '#0958d9' : hov ? '#1a68e8' : '#3c83f6';
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setPrs(false); }}
      onMouseDown={() => setPrs(true)}
      onMouseUp={() => setPrs(false)}
      style={{ height: 36, padding: '0 16px', background: bg, color: C.white, border: 'none', borderRadius: R.sm, cursor: disabled ? 'not-allowed' : 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, transition: 'background 0.12s', ...font(14), ...style }}
    >
      {children}
    </button>
  );
}

function BtnSecondary({ children, onClick, disabled, style }: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}) {
  const [hov, setHov] = React.useState(false);
  const [prs, setPrs] = React.useState(false);
  const bg = disabled ? '#f5f5f5' : prs ? '#c6d4e1' : hov ? '#d5e0eb' : '#eef3f9';
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => { setHov(false); setPrs(false); }}
      onMouseDown={() => setPrs(true)}
      onMouseUp={() => setPrs(false)}
      style={{ height: 36, padding: '0 16px', background: bg, color: disabled ? '#b8b8b8' : C.textPrimary, border: 'none', borderRadius: R.sm, cursor: disabled ? 'not-allowed' : 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, transition: 'background 0.12s', ...font(14), ...style }}
    >
      {children}
    </button>
  );
}

// ─── Иконки ───────────────────────────────────────────────────────────────────

function IconNotification({ color, size = 24 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M14 20C14 20.55 13.8038 21.0204 13.4121 21.4121C13.0204 21.8038 12.55 22 12 22C11.45 22 10.9796 21.8038 10.5879 21.4121C10.1962 21.0204 10 20.55 10 20H14ZM12 2C12.4167 2 12.7708 2.14583 13.0625 2.4375C13.3542 2.72917 13.5 3.08333 13.5 3.5V4.2002C14.8333 4.53353 15.9167 5.23751 16.75 6.3125C17.5833 7.3875 18 8.61667 18 10V17H19C19.2833 17 19.5212 17.0954 19.7129 17.2871C19.9046 17.4788 20 17.7167 20 18C20 18.2833 19.9046 18.5212 19.7129 18.7129C19.5212 18.9046 19.2833 19 19 19H5C4.71667 19 4.47878 18.9046 4.28711 18.7129C4.09544 18.5212 4 18.2833 4 18C4 17.7167 4.09544 17.4788 4.28711 17.2871C4.47878 17.0954 4.71667 17 5 17H6V10C6 8.61667 6.41667 7.3875 7.25 6.3125C8.08332 5.23751 9.16669 4.53353 10.5 4.2002V3.5C10.5 3.08333 10.6458 2.72917 10.9375 2.4375C11.2292 2.14583 11.5833 2 12 2Z" fill={color} />
    </svg>
  );
}

function IconMoreVert({ color, size = 16 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M6.66667 3.33333C6.66667 2.59695 7.26362 2 8 2C8.73638 2 9.33333 2.59695 9.33333 3.33333C9.33333 4.06971 8.73638 4.66667 8 4.66667C7.26362 4.66667 6.66667 4.06971 6.66667 3.33333ZM6.66667 8C6.66667 7.26362 7.26362 6.66667 8 6.66667C8.73638 6.66667 9.33333 7.26362 9.33333 8C9.33333 8.73638 8.73638 9.33333 8 9.33333C7.26362 9.33333 6.66667 8.73638 6.66667 8ZM6.66667 12.6667C6.66667 11.9303 7.26362 11.3333 8 11.3333C8.73638 11.3333 9.33333 11.9303 9.33333 12.6667C9.33333 13.403 8.73638 14 8 14C7.26362 14 6.66667 13.403 6.66667 12.6667Z" fill={color} />
    </svg>
  );
}

function IconSwitch({ color, size = 16 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M10.2653 0.528968C10.1893 0.263701 9.91252 0.110375 9.64714 0.186194C9.3819 0.262239 9.22855 0.538991 9.30436 0.804358L9.70671 2.21354C8.17365 1.81143 5.80637 1.75658 3.91667 3.64616C1.58282 5.98 2.06027 8.75997 2.6569 10.1921C2.76307 10.4469 3.05538 10.5676 3.31022 10.4616C3.56512 10.3554 3.68596 10.0622 3.57975 9.80729C3.0654 8.57254 2.6912 6.28568 4.6237 4.35319C6.54109 2.43595 9.10543 2.93782 10.2448 3.45573C10.4222 3.53622 10.6304 3.50575 10.778 3.37858C10.9255 3.25137 10.9857 3.05025 10.9323 2.86295L10.2653 0.528968ZM5.67157 15.1377C5.7476 15.403 6.02435 15.5563 6.28973 15.4805C6.55497 15.4044 6.70832 15.1277 6.63251 14.8623L6.23016 13.4531C7.76322 13.8552 10.1305 13.9101 12.0202 12.0205C14.354 9.68666 13.8766 6.90668 13.28 5.47461C13.1738 5.21979 12.8815 5.09905 12.6266 5.20507C12.3717 5.31128 12.2509 5.60447 12.3571 5.85937C12.8715 7.09412 13.2457 9.38098 11.3132 11.3135C9.39578 13.2307 6.83144 12.7288 5.69208 12.2109C5.51469 12.1304 5.30647 12.1609 5.15887 12.2881C5.01138 12.4153 4.95115 12.6164 5.00458 12.8037L5.67157 15.1377Z" fill={color} />
    </svg>
  );
}

function IconSettings({ color, size = 16 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M8.71975 2.50391C9.12965 2.54253 9.40921 2.86329 9.40921 3.2002C9.40935 4.33784 10.6268 5.06152 11.626 4.51758L11.6934 4.48047C12.0796 4.27024 12.5608 4.40531 12.7666 4.74121L13.4033 5.78027C13.5976 6.09753 13.4947 6.51796 13.1241 6.71973C12.1101 7.27196 12.1101 8.72804 13.1241 9.28027C13.4947 9.48204 13.5976 9.90247 13.4033 10.2197L12.7666 11.2588C12.5608 11.5947 12.0796 11.7298 11.6934 11.5195L11.626 11.4824C10.6268 10.9385 9.40935 11.6622 9.40921 12.7998C9.40921 13.159 9.09145 13.4998 8.63675 13.5H7.36331C6.9086 13.4998 6.59085 13.159 6.59085 12.7998C6.59071 11.6622 5.37328 10.9385 4.37405 11.4824L4.30667 11.5195C3.92047 11.7298 3.43924 11.5947 3.23343 11.2588L2.59671 10.2197C2.40244 9.90247 2.50535 9.48204 2.876 9.28027C3.88999 8.72804 3.88999 7.27196 2.876 6.71973C2.50534 6.51796 2.40244 6.09753 2.59671 5.78027L3.23343 4.74121C3.43924 4.40531 3.92047 4.27024 4.30667 4.48047L4.37405 4.51758C5.37328 5.06152 6.59071 4.33783 6.59085 3.2002C6.59085 2.841 6.9086 2.50018 7.36331 2.5H8.63675L8.71975 2.50391ZM11.1475 3.63867C10.8146 3.81982 10.4093 3.57913 10.4092 3.2002C10.4092 2.29423 9.68655 1.59275 8.81253 1.50879L8.63675 1.5H7.36331C6.41253 1.50018 5.59085 2.23412 5.59085 3.2002C5.59071 3.57913 5.18543 3.81982 4.85257 3.63867L4.78518 3.60156C3.95397 3.14908 2.87804 3.40784 2.38089 4.21973L1.74417 5.25879C1.23581 6.08933 1.55091 7.13669 2.39749 7.59766C2.71599 7.77103 2.71599 8.22897 2.39749 8.40234C1.55091 8.86331 1.23581 9.91067 1.74417 10.7412L2.38089 11.7803C2.87804 12.5922 3.95396 12.8509 4.78518 12.3984L4.85257 12.3613C5.18543 12.1802 5.59071 12.4209 5.59085 12.7998C5.59085 13.7659 6.41253 14.4998 7.36331 14.5H8.63675C9.58752 14.4998 10.4092 13.7659 10.4092 12.7998C10.4093 12.4209 10.8146 12.1802 11.1475 12.3613L11.2149 12.3984C12.0461 12.8509 13.122 12.5922 13.6192 11.7803L14.2559 10.7412C14.7642 9.91067 14.4491 8.86332 13.6026 8.40234C13.2841 8.22897 13.2841 7.77103 13.6026 7.59766C14.4491 7.13668 14.7642 6.08933 14.2559 5.25879L13.6192 4.21973C13.122 3.40784 12.0461 3.14908 11.2149 3.60156L11.1475 3.63867ZM8.00001 6.5C8.82843 6.5 9.5 7.17157 9.5 8C9.5 8.82843 8.82843 9.5 8.00001 9.5C7.17158 9.5 6.50001 8.82843 6.50001 8C6.50001 7.17157 7.17158 6.5 8.00001 6.5ZM8.00001 10.5C9.38072 10.5 10.5 9.38071 10.5 8C10.5 6.61929 9.38072 5.5 8.00001 5.5C6.61929 5.5 5.50001 6.61929 5.50001 8C5.50001 9.38071 6.61929 10.5 8.00001 10.5Z" fill={color} />
    </svg>
  );
}

function IconUser({ color, size = 16 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M12.1663 11.667C12.1663 11.3141 11.8677 10.8595 11.0765 10.4639C10.3151 10.0832 9.22806 9.83305 8.00033 9.83301C6.77264 9.83301 5.68558 10.0832 4.92415 10.4639C4.13281 10.8595 3.83333 11.3141 3.83333 11.667C3.83352 12.0199 4.13305 12.4736 4.92415 12.8691C5.68558 13.2498 6.77257 13.5 8.00033 13.5C9.22806 13.5 10.3151 13.2498 11.0765 12.8691C11.8674 12.4736 12.1662 12.0198 12.1663 11.667ZM10.1663 4.66699C10.1663 3.47048 9.19679 2.50018 8.00033 2.5C6.80371 2.5 5.83333 3.47038 5.83333 4.66699C5.83351 5.86346 6.80382 6.83301 8.00033 6.83301C9.19668 6.83283 10.1662 5.86335 10.1663 4.66699ZM13.1663 11.667C13.1662 12.6025 12.4212 13.3149 11.5238 13.7637C10.5963 14.2274 9.34966 14.5 8.00033 14.5C6.65097 14.5 5.40443 14.2274 4.47689 13.7637C3.57934 13.3149 2.83351 12.6026 2.83333 11.667C2.83333 10.7312 3.57924 10.0182 4.47689 9.56934C5.40441 9.10566 6.65104 8.83301 8.00033 8.83301C9.34966 8.83305 10.5963 9.10559 11.5238 9.56934C12.4213 10.0182 13.1663 10.7313 13.1663 11.667ZM11.1663 4.66699C11.1662 6.41564 9.74897 7.83283 8.00033 7.83301C6.25153 7.83301 4.83351 6.41574 4.83333 4.66699C4.83333 2.91809 6.25142 1.5 8.00033 1.5C9.74908 1.50018 11.1663 2.9182 11.1663 4.66699Z" fill={color} />
    </svg>
  );
}

function IconLogout({ color, size = 16 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M9.33366 4.01074C9.79359 4.01092 10.1664 4.38384 10.1667 4.84375C10.1667 5.11989 10.3905 5.34375 10.6667 5.34375C10.9428 5.34375 11.1667 5.11989 11.1667 4.84375C11.1664 3.83155 10.3459 3.01092 9.33366 3.01074H7.13835C6.91897 1.74774 5.4413 1.0604 4.31608 1.81055L2.98307 2.69922C2.47308 3.03924 2.16667 3.61166 2.16667 4.22461V12.1309L2.18034 12.3584C2.24597 12.8832 2.53683 13.3588 2.98307 13.6563L4.31608 14.5449C5.44148 15.2952 6.91933 14.6071 7.13835 13.3438H9.33366C10.346 13.3436 11.1667 12.5232 11.1667 11.5107C11.1666 11.2347 10.9428 11.0107 10.6667 11.0107C10.3906 11.0107 10.1667 11.2347 10.1667 11.5107C10.1667 11.9709 9.79375 12.3436 9.33366 12.3438H7.16667V4.01074H9.33366ZM3.1735 12.2344L3.16667 12.1309V4.22461C3.16667 3.94601 3.30597 3.68581 3.53776 3.53125L4.87077 2.64258C5.42456 2.27338 6.16667 2.67036 6.16667 3.33594V13.0195C6.16667 13.6851 5.42456 14.0821 4.87077 13.7129L3.53776 12.8242C3.335 12.689 3.20341 12.4728 3.1735 12.2344ZM11.6465 7.01986C11.4514 6.82458 11.4513 6.50803 11.6465 6.31283C11.8417 6.11778 12.1583 6.11778 12.3535 6.31283L12.9795 6.93978C13.5652 7.52557 13.5653 8.47511 12.9795 9.06087L12.3535 9.68685C12.1583 9.88211 11.8417 9.88211 11.6465 9.68685C11.4512 9.49159 11.4512 9.17508 11.6465 8.97982L12.1263 8.5H8.66667C8.39052 8.5 8.16667 8.27614 8.16667 8C8.16667 7.72386 8.39052 7.5 8.66667 7.5H12.1259L11.6465 7.01986Z" fill={color} />
    </svg>
  );
}

// ─── Dropdown item ────────────────────────────────────────────────────────────

function DropdownItem({
  icon, text, subText, hovered, onMouseEnter, onMouseLeave, onClick,
}: {
  icon: (color: string) => React.ReactNode;
  text: string;
  subText?: string;
  hovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick?: () => void;
}) {
  return (
    <button
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '8px 12px', borderRadius: 4,
        background: hovered ? '#f6f6f6' : C.white,
        border: 'none', cursor: 'pointer', width: '100%',
        textAlign: 'left', boxSizing: 'border-box',
      }}
    >
      <div style={{ flexShrink: 0, display: 'flex' }}>{icon('#282828')}</div>
      <div style={{ minWidth: 0 }}>
        <div style={{ ...font(14), color: C.textPrimary }}>{text}</div>
        {subText && <div style={{ ...font(12), color: C.textMuted, marginTop: 2 }}>{subText}</div>}
      </div>
    </button>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

function WorkspaceHeader({ user }: { user: CurrentUser | null }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const chipRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (
        chipRef.current && !chipRef.current.contains(e.target as Node) &&
        dropdownRef.current && !dropdownRef.current.contains(e.target as Node)
      ) setDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [dropdownOpen]);

  return (
    <div style={{ padding: '8px 8px 0', flexShrink: 0, position: 'sticky', top: 0, zIndex: 10, background: C.bgPage }}>
      <div style={{
        background: C.white, borderRadius: R.lg, height: 74,
        padding: '0 24px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', boxSizing: 'border-box',
      }}>
        <img src={logoUrl} alt="Praktis" style={{ height: 40, width: 'auto', display: 'block' }} />
        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button style={{ width: 49, height: 49, border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: R.md, flexShrink: 0 }}>
              <IconNotification color="#C6D4E1" size={24} />
            </button>
            <div style={{ position: 'relative' }}>
              <div ref={chipRef} onClick={() => setDropdownOpen(v => !v)} style={{ display: 'flex', alignItems: 'center', gap: 8, background: C.bgPage, borderRadius: R.md, padding: '8px 8px 8px 10px', width: 230, height: 50, cursor: 'pointer', boxSizing: 'border-box' }}>
                <div style={{ width: 30, height: 30, borderRadius: R.sm, background: C.avatarBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.white, flexShrink: 0, ...font(14) }}>{user.initials}</div>
                <div style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
                  <div style={{ ...font(16), color: C.textPrimary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.fullName}</div>
                  {user.companyName && <div style={{ ...font(12), color: C.textSecondary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.companyName}</div>}
                </div>
                <IconMoreVert color="#AABCCE" size={16} />
              </div>
              {dropdownOpen && (
                <div ref={dropdownRef} style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, zIndex: 100, background: C.white, borderRadius: R.sm, padding: 8, width: 255, boxShadow: '0px 2px 4px rgba(0,0,0,0.08), 0px -8px 8px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: 4, boxSizing: 'border-box' }}>
                  <DropdownItem icon={(c) => <IconSwitch color={c} />} text="Заказчик/Организатор" hovered={hoveredItem === 'role'} onMouseEnter={() => setHoveredItem('role')} onMouseLeave={() => setHoveredItem(null)} />
                  <DropdownItem icon={(c) => <IconSettings color={c} />} text="Настройки профиля" hovered={hoveredItem === 'settings'} onMouseEnter={() => setHoveredItem('settings')} onMouseLeave={() => setHoveredItem(null)} />
                  <div style={{ paddingTop: 8 }}>
                    <div style={{ height: 1, background: C.borderDefault, marginBottom: 8 }} />
                    <div style={{ ...font(12), color: C.textMuted, padding: '0 12px 4px' }}>Сменить аккаунт:</div>
                  </div>
                  <DropdownItem icon={(c) => <IconUser color={c} />} text={user.companyName || 'ООО «Сетл»'} subText="Пользователь" hovered={hoveredItem === 'company1'} onMouseEnter={() => setHoveredItem('company1')} onMouseLeave={() => setHoveredItem(null)} />
                  <div style={{ height: 1, background: C.borderDefault, margin: '4px 0' }} />
                  <DropdownItem icon={(c) => <IconLogout color={c} />} text="Выйти" hovered={hoveredItem === 'logout'} onMouseEnter={() => setHoveredItem('logout')} onMouseLeave={() => setHoveredItem(null)} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function WorkspaceFooter() {
  return (
    <footer style={{ background: C.white, padding: '0 24px', height: 48, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
      <span style={{ ...font(14), color: C.textMuted }}>© 2024. Setl Group</span>
      <div style={{ display: 'flex', gap: 60 }}>
        {['Защита персональных данных', 'Инструкция пользователя'].map(t => (
          <span key={t} style={{ ...font(14), color: C.textPrimary, cursor: 'pointer' }}>{t}</span>
        ))}
      </div>
    </footer>
  );
}

// ─── Витрина: данные ──────────────────────────────────────────────────────────

const SERVICES = [
  { id: 'mc',      name: 'Моя компания', img: imgMiMc      },
  { id: 'id',      name: 'ИД',           img: imgMiId      },
  { id: 'etp',     name: 'Лоты',         img: imgMiEtp     },
  { id: 'ks',      name: 'КС',           img: imgMiKs      },
  { id: 'lkk',     name: 'ЛКК',          img: imgMiLkk     },
  { id: 'refs',    name: 'Справочники',  img: imgMiRefs    },
  { id: 'objects', name: 'Объекты',      img: imgMiObjects },
  { id: 'icona',   name: 'ICONA',        img: imgMiIcona   },
  { id: 'pir',     name: 'ПИР',          img: imgMiPir     },
];

// ─── Каталог ИС: типы и теги ─────────────────────────────────────────────────

type TagType = 'free' | 'paid' | 'bim';

const TAG_STYLES: Record<TagType, { label: string; bg: string; border: string; color: string }> = {
  free: { label: 'Бесплатно',        bg: '#ebfddc', border: '#cbeead', color: '#599c1e' },
  paid: { label: 'Платно',           bg: '#f7faff', border: '#8ab5fa', color: '#3c83f6' },
  bim:  { label: 'AR / BIM-технология', bg: '#fff0e1', border: '#ffe5cc', color: '#ed7803' },
};

function Tag({ type }: { type: TagType }) {
  const s = TAG_STYLES[type];
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', height: 24, padding: '0 8px', background: s.bg, border: `1px solid ${s.border}`, borderRadius: 4, alignSelf: 'flex-start', boxSizing: 'border-box' }}>
      <span style={{ ...font(12), color: s.color }}>{s.label}</span>
    </div>
  );
}

// ─── Каталог ИС: данные ───────────────────────────────────────────────────────

type ModuleFeature = { title: string; desc: string };
type ModuleTariff  = { name: string; price: string; features: string[]; note: string };

type CatalogModule = {
  id: string;
  name: string;
  subtitle: string;
  desc: string;
  tag: TagType;
  features: ModuleFeature[];
  tariff?: ModuleTariff;
  img: string;
  connected: boolean;
};

const CATALOG_MODULES: CatalogModule[] = [
  {
    id: 'objects', name: 'Объекты', subtitle: 'Управление объектами строительства', tag: 'free',
    desc: 'Централизованный реестр строительных объектов. Храните адреса, площади, сроки и контакты — без Excel.',
    features: [
      { title: 'Единый реестр',       desc: 'Все объекты в одном месте'       },
      { title: 'Быстрый поиск',       desc: 'Фильтры по статусу и адресу'     },
      { title: 'История изменений',   desc: 'Кто и что менял'                 },
      { title: 'Интеграция',          desc: 'Синхронизация с другими модулями' },
    ],
    img: imgMiObjects, connected: true,
  },
  {
    id: 'refs', name: 'Справочники', subtitle: 'Нормативно-справочная информация', tag: 'free',
    desc: 'Доступ к централизованным справочникам и классификаторам строительной отрасли в режиме реального времени.',
    features: [
      { title: 'Актуальные данные', desc: 'Обновление в реальном времени' },
      { title: 'Классификаторы',    desc: 'ОКПД2, ОКВЭД, ОКЕИ и другие'  },
      { title: 'Экспорт',           desc: 'В Excel и другие форматы'      },
      { title: 'API-доступ',        desc: 'Интеграция с вашими системами' },
    ],
    img: imgMiRefs, connected: true,
  },
  {
    id: 'lkk', name: 'ЛКК', subtitle: 'Личный кабинет клиента', tag: 'paid',
    desc: 'Инструмент для управления договорами, актами и взаимодействия с застройщиком в едином цифровом пространстве.',
    features: [
      { title: 'Договоры онлайн',    desc: 'Подписание без бумаги'  },
      { title: 'Статусы объектов',   desc: 'В реальном времени'     },
      { title: 'Чат с менеджером',   desc: 'Прямая коммуникация'    },
      { title: 'История операций',   desc: 'Полный архив'           },
    ],
    tariff: { name: 'Стандарт', price: '9 000 ₽ / мес', features: ['Неограниченное число клиентов', 'Электронное подписание документов', 'Интеграция с CRM застройщика'], note: 'Оплата — после подписания. Отключить сервис можно в любой момент в разделе «Каталог ИС».' },
    img: imgMiLkk, connected: false,
  },
  {
    id: 'ks', name: 'КС', subtitle: 'Система электронного актирования', tag: 'paid',
    desc: 'Переводит актирование в цифровой вид: формируйте КС-2, КС-3 и КС-6, согласуйте объёмы онлайн и отслеживайте выполнение по «шахматке».',
    features: [
      { title: 'Формы КС в пару кликов', desc: 'КС-2, КС-3, КС-6 автоматически'   },
      { title: 'Онлайн-согласование',    desc: 'Маршруты и статусы по ролям'       },
      { title: '«Шахматка» выполнения',  desc: 'Наглядно по секциям и этажам'      },
      { title: 'Быстрее оплата',         desc: 'Сокращение срока согласований'     },
    ],
    tariff: { name: 'Стандарт', price: '18 000 ₽ / мес', features: ['Все формы КС-2, КС-3, КС-6 без ограничений', 'Онлайн-согласование и шахматка', 'Интеграция с 1С и ICONA'], note: 'Оплата — после подписания. Отключить сервис можно в любой момент в разделе «Каталог ИС».' },
    img: imgMiKs, connected: true,
  },
  {
    id: 'mc', name: 'Моя компания', subtitle: 'Управление организацией', tag: 'free',
    desc: 'Управление профилем, структурой и настройками компании. Добавляйте сотрудников, настраивайте роли и следите за доступами.',
    features: [
      { title: 'Профиль компании',  desc: 'Реквизиты и документы'        },
      { title: 'Управление ролями', desc: 'Гибкое распределение прав'     },
      { title: 'Сотрудники',        desc: 'Приглашение и управление'      },
      { title: 'Безопасность',      desc: 'Журнал активности'             },
    ],
    img: imgMiMc, connected: true,
  },
  {
    id: 'id', name: 'ИД', subtitle: 'Цифровая исполнительная документация', tag: 'bim',
    desc: 'Хранение и управление исполнительной документацией в цифровом формате с применением BIM-технологий.',
    features: [
      { title: '3D-привязка',          desc: 'Документы к элементам модели' },
      { title: 'Электронный архив',    desc: 'Всегда под рукой'             },
      { title: 'Контроль комплектности', desc: 'Автоматическая проверка'   },
      { title: 'Экспорт в BIM',        desc: 'IFC и другие форматы'         },
    ],
    img: imgMiId, connected: true,
  },
  {
    id: 'etp', name: 'ЭТП', subtitle: 'Электронная торговая площадка', tag: 'paid',
    desc: 'Площадка для проведения конкурентных закупочных процедур: тендеры, запросы котировок, аукционы в одном окне.',
    features: [
      { title: 'Тендеры онлайн',          desc: 'Без бумажного документооборота' },
      { title: 'Квалификация поставщиков', desc: 'Встроенная проверка'            },
      { title: 'Аналитика закупок',        desc: 'Отчёты и статистика'            },
      { title: 'Интеграция с 1С',          desc: 'Синхронизация договоров'        },
    ],
    tariff: { name: 'Стандарт', price: '15 000 ₽ / мес', features: ['Неограниченное число процедур', 'Квалификация и рейтинг поставщиков', 'Аналитика и отчётность'], note: 'Оплата — после подписания. Отключить сервис можно в любой момент в разделе «Каталог ИС».' },
    img: imgMiEtp, connected: false,
  },
];

// ─── Навигация ────────────────────────────────────────────────────────────────

type NavTab = 'showcase' | 'catalog-is';

const NAV_ITEMS: { id: string; label: string; icon: string; badge?: string; clickable?: NavTab }[] = [
  { id: 'showcase',          label: 'Витрина сервисов',      icon: navShowcase,  clickable: 'showcase'   },
  { id: 'profile',           label: 'Профиль компании',      icon: navProfile   },
  { id: 'catalog-companies', label: 'Каталог компаний',      icon: navCompanies },
  { id: 'catalog-users',     label: 'Каталог пользователей', icon: navUsers     },
  { id: 'catalog-roles',     label: 'Каталог ролей',         icon: navRoles     },
  { id: 'catalog-is',        label: 'Каталог ИС',            icon: navCatalogIs, clickable: 'catalog-is' },
  { id: 'requests',          label: 'Заявки',                icon: navRequests,  badge: '15+' },
  { id: 'billing',           label: 'Биллинг',               icon: navBilling   },
];

// ─── Модальное окно модуля ────────────────────────────────────────────────────

function ModuleModal({ module: m, onClose }: { module: CatalogModule; onClose: () => void }) {
  const [agreed, setAgreed] = useState(false);

  return (
    <div
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{ width: 700, maxWidth: '100%', maxHeight: '90vh', background: C.white, borderRadius: 20, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
      >
        {/* ── Фиксированная шапка ── */}
        <div style={{ flexShrink: 0, padding: '20px 24px 16px', borderBottom: `1px solid ${C.borderLight}`, display: 'flex', gap: 14, alignItems: 'flex-start', position: 'relative' }}>
          <button
            onClick={onClose}
            style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M11 3L3 11M3 3L11 11" stroke="#41484a" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          <div style={{ width: 52, height: 52, borderRadius: 10, background: C.bgPage, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <img src={m.img} alt={m.name} style={{ width: 40, height: 40, objectFit: 'contain' }} />
          </div>
          <div style={{ flex: 1, minWidth: 0, paddingRight: 28 }}>
            <h2 style={{ margin: 0, ...font(22, 500), color: C.textPrimary }}>Подключение Praktis {m.name}</h2>
            <div style={{ ...font(14), color: C.textSecondary, marginTop: 4 }}>{m.subtitle}</div>
          </div>
        </div>

        {/* ── Скроллируемый контент ── */}
        <div className="kit-scroll" style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '20px 24px 20px 24px' }}>

          {!m.connected && (
            <p style={{ ...font(14), color: C.textPrimary, lineHeight: 1.6, margin: '0 0 20px' }}>
              Ознакомьтесь с возможностями, тарифом и условиями. Чтобы активировать сервис, нужно подписать документы электронной подписью.
            </p>
          )}

          <div style={{ background: 'linear-gradient(135deg, #1a3a7a 0%, #2563eb 100%)', borderRadius: 12, padding: '28px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 150, gap: 10, marginBottom: 16 }}>
            <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M6 3.5L15 9L6 14.5V3.5Z" fill="white"/></svg>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ ...font(13, 500), color: 'white' }}>Видеопрезентация · 2 мин</div>
              <div style={{ ...font(12), color: 'rgba(255,255,255,0.7)', marginTop: 2 }}>Как работать в Praktis {m.name}</div>
            </div>
          </div>

          <div style={{ background: C.bgPage, borderRadius: 12, padding: 20, marginBottom: 12 }}>
            <h3 style={{ margin: '0 0 8px', ...font(16, 500), color: C.textPrimary }}>Коротко о сервисе</h3>
            <p style={{ ...font(14), color: C.textSecondary, lineHeight: 1.6, margin: '0 0 16px' }}>{m.desc}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {m.features.map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <div style={{ flexShrink: 0, marginTop: 1 }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <rect width="16" height="16" rx="3" fill="#eef3f9"/>
                      <path d="M4 8L6.5 10.5L12 5" stroke="#3c83f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ ...font(13, 500), color: C.textPrimary }}>{f.title}</div>
                    <div style={{ ...font(12), color: C.textSecondary, marginTop: 2 }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {m.tariff && (
            <div style={{ background: C.bgPage, borderRadius: 12, padding: 20, marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
                <span style={{ ...font(16, 500), color: C.textPrimary }}>Тариф «{m.tariff.name}»</span>
                <span style={{ ...font(20, 600), color: C.textPrimary }}>{m.tariff.price}</span>
              </div>
              {m.tariff.features.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7L5.5 10.5L12 3.5" stroke="#599c1e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span style={{ ...font(14), color: C.textPrimary }}>{f}</span>
                </div>
              ))}
              <p style={{ ...font(12), color: C.textSecondary, margin: '12px 0 0', lineHeight: 1.5 }}>{m.tariff.note}</p>
            </div>
          )}

          {/* Документы + чекбокс — только для неподключённых */}
          {!m.connected && (
            <>
              <div style={{ background: C.bgPage, borderRadius: 12, padding: 20, marginBottom: 16 }}>
                <h3 style={{ margin: '0 0 12px', ...font(16, 500), color: C.textPrimary }}>Документы для подписания</h3>
                {['Договор-оферта на использование сервиса', 'Согласие на обработку персональных данных'].map((doc, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: i === 0 ? 8 : 0 }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M9 2H4C3.45 2 3 2.45 3 3V13C3 13.55 3.45 14 4 14H12C12.55 14 13 13.55 13 13V6L9 2Z" stroke="#3c83f6" strokeWidth="1.2" strokeLinejoin="round"/>
                      <path d="M9 2V6H13" stroke="#3c83f6" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span style={{ ...font(14), color: C.primary, cursor: 'pointer' }}>{doc}</span>
                  </div>
                ))}
              </div>

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', marginBottom: 16 }}>
                <div
                  onClick={() => setAgreed(v => !v)}
                  style={{ width: 18, height: 18, borderRadius: 4, flexShrink: 0, marginTop: 1, background: agreed ? C.primary : C.white, border: `2px solid ${agreed ? C.primary : C.borderDefault}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxSizing: 'border-box' }}
                >
                  {agreed && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <span style={{ ...font(14), color: C.textPrimary, lineHeight: 1.5 }}>
                  Я ознакомился с обоими документами и подтверждаю согласие с их условиями
                </span>
              </label>

              <BtnPrimary
                onClick={undefined}
                disabled={!agreed}
                style={{ width: '100%', height: 48, borderRadius: R.md, ...font(14, 500), marginBottom: 12 }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="white" strokeWidth="1.4"/><path d="M6 9L8 11L12 7" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Подписать оба документа электронной подписью
              </BtnPrimary>
              <p style={{ ...font(12), color: C.textSecondary, textAlign: 'center', lineHeight: 1.5, margin: '0 0 8px' }}>
                Оба документа подписываются одной электронной подписью. Сервис станет доступен сразу после подписания.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── WorkspacePage ────────────────────────────────────────────────────────────

export default function WorkspacePage({ initialTab = 'showcase' }: { initialTab?: NavTab }) {
  const [activeTab, setActiveTab] = useState<NavTab>(initialTab);
  const [user, setUser] = useState<CurrentUser>({
    fullName: 'Лаврентьев Александр',
    email: 'a.lavrentyev@setltech.ru',
    initials: 'ЛА',
    companyName: 'ООО "Сетл Тех"',
  });

  useEffect(() => {
    api.getCurrentUser().then(u => setUser({ ...u, companyName: 'ООО "Сетл Тех"' }));
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: C.bgPage }}>

      {/* ── Sidebar ── */}
      <div style={{ width: 240, flexShrink: 0, background: C.white, borderRadius: '0 12px 12px 0', padding: '20px 12px 28px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ ...font(18, 500), color: C.textMuted }}>Моя компания</span>
          <div style={{ width: 30, height: 30, background: '#eef3f9', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <span style={{ ...font(14), color: C.textSecondary }}>‹</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {NAV_ITEMS.map(item => {
            const isActive = item.clickable === activeTab;
            return (
              <div
                key={item.id}
                onClick={item.clickable ? () => setActiveTab(item.clickable!) : undefined}
                style={{ padding: '6px 12px', borderRadius: 6, background: isActive ? C.primaryLight : C.white, display: 'flex', alignItems: 'center', gap: 8, minHeight: 46, cursor: item.clickable ? 'pointer' : 'default' }}
              >
                <img
                  src={item.icon}
                  alt=""
                  style={{
                    width: 16, height: 16, flexShrink: 0, objectFit: 'contain',
                    filter: isActive
                      ? 'brightness(0) saturate(100%) invert(44%) sepia(60%) saturate(600%) hue-rotate(196deg) brightness(106%)'
                      : 'brightness(0)',
                  }}
                />
                <span style={{ ...font(14, 500), color: isActive ? C.primary : C.textPrimary, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {item.label}
                </span>
                {item.badge && (
                  <span style={{ background: '#00b35f', color: C.white, borderRadius: 10, padding: '2px 6px', ...font(10, 600) }}>
                    {item.badge}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Правая колонка ── */}
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <WorkspaceHeader user={user} />
        {activeTab === 'showcase' ? <ShowcaseContent /> : <CatalogIsContent />}
        <WorkspaceFooter />
      </div>
    </div>
  );
}

// ─── Витрина сервисов ─────────────────────────────────────────────────────────

function ShowcaseContent() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, padding: '12px 8px' }}>
      <div style={{ background: C.white, borderRadius: 20, padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <h2 style={{ margin: 0, ...font(24, 500), color: C.textPrimary }}>Витрина сервисов</h2>
        <div style={{ display: 'flex', gap: 12 }}>
          <BtnSecondary>+ Создать группу</BtnSecondary>
          <BtnPrimary>Редактировать</BtnPrimary>
        </div>
      </div>
      <div style={{ background: C.white, borderRadius: 20, padding: 24 }}>
        <h3 style={{ margin: '0 0 24px', ...font(20, 500), color: C.textPrimary }}>Основные системы</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))', gap: 12 }}>
          {SERVICES.map(s => (
            <div key={s.id} style={{ height: 180, background: C.bgPage, borderRadius: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '24px 12px', cursor: 'pointer' }}>
              <img src={s.img} alt={s.name} style={{ width: 75, height: 75, objectFit: 'contain' }} />
              <span style={{ ...font(16, 500), color: C.textPrimary, textAlign: 'center' }}>{s.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Каталог ИС ───────────────────────────────────────────────────────────────

function CatalogIsContent() {
  const [activeModule, setActiveModule] = useState<CatalogModule | null>(null);

  return (
    <>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 30, padding: '24px 24px' }}>
        <h2 style={{ margin: 0, ...font(24, 500), color: C.textPrimary }}>Сервисы для добавления в экосистему Praktis</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24 }}>
          {CATALOG_MODULES.map(m => (
            <CatalogIsCard key={m.id} module={m} onOpen={() => setActiveModule(m)} />
          ))}
        </div>
      </div>
      {activeModule && <ModuleModal module={activeModule} onClose={() => setActiveModule(null)} />}
    </>
  );
}

function CatalogIsCard({ module: m, onOpen }: { module: CatalogModule; onOpen: () => void }) {
  return (
    <div style={{ background: C.white, borderRadius: 20, padding: 20, display: 'flex', alignItems: 'center', gap: 16, boxSizing: 'border-box', minHeight: 210 }}>
      <div style={{ flexShrink: 0, alignSelf: 'center' }}>
        <img src={m.img} alt={m.name} style={{ width: 138, height: 138, objectFit: 'contain', display: 'block' }} />
      </div>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Tag type={m.tag} />
        <div style={{ ...font(20, 500), color: m.connected ? C.textPrimary : C.textMuted }}>
          {m.name}
        </div>
        <div style={{ ...font(14), color: m.connected ? C.textPrimary : C.textMuted, lineHeight: 1.4, flex: 1 }}>
          {m.desc}
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 10 }}>
          <BtnSecondary onClick={onOpen} style={{ flex: 1 }}>Подробнее</BtnSecondary>
          {m.connected ? (
            <button style={{ flex: 1, height: 36, background: C.successBg, border: 'none', borderRadius: R.sm, cursor: 'default', ...font(14), color: C.successText }}>
              Подключено
            </button>
          ) : (
            <BtnPrimary onClick={onOpen} style={{ flex: 1 }}>Подключить</BtnPrimary>
          )}
        </div>
      </div>
    </div>
  );
}
