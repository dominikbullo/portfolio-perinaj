import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'fs';
import { join } from 'path';
import QRCode from 'qrcode';
import type { APIRoute } from 'astro';
import { siteConfig } from '../config';

export const GET: APIRoute = async () => {
  const fontRegular = readFileSync(
    join(process.cwd(), 'node_modules/@fontsource/dm-sans/files/dm-sans-latin-400-normal.woff')
  );
  const fontBold = readFileSync(
    join(process.cwd(), 'node_modules/@fontsource/dm-sans/files/dm-sans-latin-700-normal.woff')
  );
  const fontMedium = readFileSync(
    join(process.cwd(), 'node_modules/@fontsource/dm-sans/files/dm-sans-latin-500-normal.woff')
  );

  const profilePhoto = `data:image/jpeg;base64,${readFileSync(join(process.cwd(), 'public/barbora.jpg')).toString('base64')}`;

  const qrDataUrl = await QRCode.toDataURL('/', {
    width: 80,
    margin: 1,
    color: { dark: '#f9f7eb', light: '#00000000' },
  });

  const bg = '#1a4530';
  const cream = '#f9f7eb';
  const sage = '#94A187';
  const muted = 'rgba(249,247,235,0.4)';
  const subtle = 'rgba(249,247,235,0.08)';
  const border = 'rgba(249,247,235,0.12)';

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          display: 'flex',
          width: '1200px',
          height: '630px',
          background: bg,
          padding: '64px 72px',
          fontFamily: 'DM Sans',
          position: 'relative',
          overflow: 'hidden',
        },
        children: [
          // Ambient glow — top left
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                top: '-120px',
                left: '-80px',
                width: '500px',
                height: '500px',
                background: 'radial-gradient(ellipse, rgba(148,161,135,0.18) 0%, transparent 70%)',
                borderRadius: '50%',
              },
            },
          },
          // Ambient glow — bottom right
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                bottom: '-100px',
                right: '-60px',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(ellipse, rgba(249,247,235,0.04) 0%, transparent 70%)',
                borderRadius: '50%',
              },
            },
          },
          // Main layout
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                width: '100%',
                position: 'relative',
              },
              children: [
                // Top row: photo + name block
                {
                  type: 'div',
                  props: {
                    style: { display: 'flex', alignItems: 'center', gap: '32px' },
                    children: [
                      // Profile photo
                      {
                        type: 'img',
                        props: {
                          src: profilePhoto,
                          width: 100,
                          height: 100,
                          style: {
                            borderRadius: '50%',
                            objectFit: 'cover',
                            objectPosition: 'center top',
                            border: `2px solid ${sage}`,
                          },
                        },
                      },
                      // Name + status row
                      {
                        type: 'div',
                        props: {
                          style: { display: 'flex', flexDirection: 'column', gap: '8px' },
                          children: [
                            {
                              type: 'div',
                              props: {
                                style: { display: 'flex', alignItems: 'center', gap: '8px' },
                                children: [
                                  {
                                    type: 'div',
                                    props: {
                                      style: {
                                        width: '8px', height: '8px',
                                        borderRadius: '50%',
                                        background: sage,
                                        boxShadow: `0 0 8px ${sage}80`,
                                      },
                                    },
                                  },
                                  {
                                    type: 'span',
                                    props: {
                                      style: { color: muted, fontSize: '15px', fontWeight: 400, letterSpacing: '0.02em' },
                                      children: 'Nordcloud · IBM · Stockholm, Sweden',
                                    },
                                  },
                                ],
                              },
                            },
                            {
                              type: 'span',
                              props: {
                                style: { color: cream, fontSize: '38px', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1 },
                                children: siteConfig.name,
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                // Middle: role + tagline
                {
                  type: 'div',
                  props: {
                    style: { display: 'flex', flexDirection: 'column', gap: '14px' },
                    children: [
                      {
                        type: 'span',
                        props: {
                          style: { color: sage, fontSize: '26px', fontWeight: 500, letterSpacing: '-0.01em' },
                          children: siteConfig.role,
                        },
                      },
                      {
                        type: 'span',
                        props: {
                          style: { color: muted, fontSize: '16px', fontWeight: 400, maxWidth: '720px', lineHeight: 1.55 },
                          children: 'EU Commission pre-COP30 speaker · Baltic Sea Region Youth Forum · MSc Stockholm University',
                        },
                      },
                    ],
                  },
                },
                // Bottom: stats + QR
                {
                  type: 'div',
                  props: {
                    style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' },
                    children: [
                      // Stat pills row
                      {
                        type: 'div',
                        props: {
                          style: { display: 'flex', gap: '12px' },
                          children: [
                            ['5 Nordic Offices', '6 Languages', 'P&L Ownership'].map((label) => ({
                              type: 'div',
                              props: {
                                style: {
                                  display: 'flex',
                                  padding: '8px 18px',
                                  borderRadius: '100px',
                                  border: `1px solid ${border}`,
                                  background: subtle,
                                  color: 'rgba(249,247,235,0.65)',
                                  fontSize: '14px',
                                  fontWeight: 500,
                                  letterSpacing: '0.01em',
                                },
                                children: label,
                              },
                            })),
                          ],
                        },
                      },
                      // QR + domain
                      {
                        type: 'div',
                        props: {
                          style: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' },
                          children: [
                            {
                              type: 'img',
                              props: { src: qrDataUrl, width: 68, height: 68, style: { borderRadius: '6px' } },
                            },
                            {
                              type: 'span',
                              props: { style: { color: muted, fontSize: '13px', fontWeight: 400 }, children: siteConfig.email },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'DM Sans', data: fontRegular, weight: 400, style: 'normal' },
        { name: 'DM Sans', data: fontMedium, weight: 500, style: 'normal' },
        { name: 'DM Sans', data: fontBold, weight: 700, style: 'normal' },
      ],
    }
  );

  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } });
  const png = resvg.render().asPng();

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
