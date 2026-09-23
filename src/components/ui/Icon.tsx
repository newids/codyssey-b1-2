import type { SVGProps } from 'react';

export type IconName =
  | 'check' | 'slash' | 'alert' | 'sun' | 'moon' | 'close' | 'arrow-left' | 'arrow-right'
  | 'plus' | 'search' | 'edit' | 'trash' | 'bolt' | 'refresh' | 'menu' | 'note' | 'book' | 'user';

const PATHS: Record<IconName, string> = {
  check: 'M5 12.5 9.5 17 19 7.5',
  slash: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM5.6 5.6l12.8 12.8',
  alert: 'M12 8v5M12 16.5h.01M10.3 3.9 2.7 17.2A2 2 0 0 0 4.4 20h15.2a2 2 0 0 0 1.7-2.8L13.7 3.9a2 2 0 0 0-3.4 0Z',
  sun: 'M12 4V2M12 22v-2M4 12H2M22 12h-2M5.6 5.6 4.2 4.2M19.8 19.8l-1.4-1.4M5.6 18.4l-1.4 1.4M19.8 4.2l-1.4 1.4M12 7.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z',
  moon: 'M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z',
  close: 'M6 6l12 12M18 6 6 18',
  'arrow-left': 'M19 12H5M11 6l-6 6 6 6',
  'arrow-right': 'M5 12h14M13 6l6 6-6 6',
  plus: 'M12 5v14M5 12h14',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14ZM20 20l-4-4',
  edit: 'M4 20h4l10.5-10.5a2.1 2.1 0 0 0-3-3L5 17v3ZM13.5 6.5l3 3',
  trash: 'M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3',
  bolt: 'M13 2 4 14h7l-1 8 9-12h-7l1-8Z',
  refresh: 'M20 12a8 8 0 1 1-2.3-5.7M20 4v5h-5',
  menu: 'M4 7h16M4 12h16M4 17h16',
  note: 'M6 3h9l5 5v13H6V3ZM14 3v6h6M9 13h6M9 17h6',
  book: 'M4 5a2 2 0 0 1 2-2h14v16H6a2 2 0 0 0-2 2V5ZM4 19a2 2 0 0 0 2 2h14M8 7h8',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0',
};

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName;
  size?: number;
  /** 장식용이면 true(기본). 의미가 있으면 false + aria-label */
  decorative?: boolean;
  label?: string;
}

/** 한 획 두께의 스트로크 아이콘 시스템 — 이모지·유니코드 기호 대신 사용 */
export function Icon({ name, size = 18, decorative = true, label, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={decorative || undefined}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : label}
      focusable="false"
      {...rest}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
