// Original flat illustrations for each kind of kit, in the Switched On palette.
// No product photos or brand artwork: each drawing is a generic silhouette.
(function () {
  const C = {
    bg: '#1d1b18', kit: '#2c2924', kit2: '#3a3630', line: '#4a443b',
    cream: '#F1ECE3', muted: '#B9B1A4', amber: '#F5A623', ink: '#0a0908'
  };
  let n = 0;

  function glow(id, sd) {
    return `<filter id="${id}" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="${sd}"/></filter>`;
  }

  const draw = {
    soundbar(id) {
      return `<defs>${glow(id, 18)}</defs>
        <rect x="90" y="40" width="220" height="124" rx="8" fill="${C.ink}" stroke="${C.kit2}" stroke-width="3"/>
        <rect x="170" y="164" width="60" height="18" fill="${C.kit}"/>
        <ellipse cx="200" cy="232" rx="150" ry="14" fill="${C.amber}" opacity=".18" filter="url(#${id})"/>
        <rect x="56" y="196" width="288" height="40" rx="20" fill="${C.kit}" stroke="${C.line}" stroke-width="2"/>
        ${Array.from({ length: 22 }, (_, i) => `<circle cx="${84 + i * 11}" cy="216" r="2.6" fill="${C.kit2}"/>`).join('')}
        <circle cx="322" cy="216" r="5" fill="${C.amber}"/>`;
    },
    system(id) {
      return `<defs>${glow(id, 16)}</defs>
        <rect x="70" y="44" width="200" height="112" rx="8" fill="${C.ink}" stroke="${C.kit2}" stroke-width="3"/>
        <rect x="40" y="182" width="250" height="34" rx="17" fill="${C.kit}" stroke="${C.line}" stroke-width="2"/>
        <circle cx="270" cy="199" r="4.5" fill="${C.amber}"/>
        <rect x="300" y="140" width="72" height="120" rx="10" fill="${C.kit}" stroke="${C.line}" stroke-width="2"/>
        <circle cx="336" cy="210" r="24" fill="${C.ink}"/>
        <circle cx="336" cy="210" r="9" fill="${C.amber}"/>
        <ellipse cx="336" cy="210" rx="40" ry="40" fill="${C.amber}" opacity=".12" filter="url(#${id})"/>
        <rect x="18" y="236" width="34" height="44" rx="6" fill="${C.kit2}"/>
        <rect x="64" y="236" width="34" height="44" rx="6" fill="${C.kit2}"/>`;
    },
    stick(id) {
      return `<defs>${glow(id, 14)}</defs>
        <rect x="70" y="120" width="200" height="56" rx="18" fill="${C.kit}" stroke="${C.line}" stroke-width="2"/>
        <rect x="270" y="132" width="44" height="32" rx="4" fill="${C.kit2}"/>
        <rect x="314" y="138" width="20" height="20" rx="2" fill="${C.muted}"/>
        <circle cx="104" cy="148" r="5" fill="${C.amber}"/>
        <ellipse cx="104" cy="148" rx="16" ry="16" fill="${C.amber}" opacity=".35" filter="url(#${id})"/>
        <rect x="150" y="200" width="44" height="88" rx="20" fill="${C.kit}" stroke="${C.line}" stroke-width="2" transform="rotate(-18 172 244)"/>
        <circle cx="166" cy="222" r="10" fill="${C.kit2}" transform="rotate(-18 172 244)"/>`;
    },
    box(id) {
      return `<defs>${glow(id, 20)}</defs>
        <ellipse cx="160" cy="190" rx="110" ry="18" fill="${C.amber}" opacity=".14" filter="url(#${id})"/>
        <rect x="80" y="104" width="160" height="82" rx="20" fill="${C.kit}" stroke="${C.line}" stroke-width="2"/>
        <rect x="80" y="104" width="160" height="14" rx="7" fill="${C.kit2}"/>
        <circle cx="222" cy="170" r="4" fill="${C.amber}"/>
        <rect x="282" y="86" width="30" height="134" rx="12" fill="${C.kit}" stroke="${C.line}" stroke-width="2"/>
        <circle cx="297" cy="116" r="11" fill="${C.kit2}"/>
        <rect x="290" y="146" width="14" height="5" rx="2" fill="${C.kit2}"/>`;
    },
    tvlight(id) {
      return `<defs>${glow(id, 26)}</defs>
        <rect x="70" y="50" width="260" height="160" rx="18" fill="${C.amber}" opacity=".55" filter="url(#${id})"/>
        <rect x="86" y="62" width="228" height="136" rx="6" fill="${C.ink}" stroke="${C.kit2}" stroke-width="3"/>
        <rect x="96" y="72" width="208" height="116" fill="#16130f"/>
        <circle cx="236" cy="118" r="22" fill="${C.amber}" opacity=".9"/>
        <polygon points="96,188 150,140 196,170 246,132 304,188" fill="${C.kit}"/>
        <rect x="140" y="236" width="120" height="20" rx="10" fill="${C.kit}"/>`;
    },
    hub(id) {
      return `<defs>${glow(id, 14)}</defs>
        <path d="M70 230 C 120 230, 120 190, 150 190" fill="none" stroke="${C.kit2}" stroke-width="8" stroke-linecap="round"/>
        <rect x="140" y="110" width="160" height="128" rx="28" fill="${C.kit}" stroke="${C.line}" stroke-width="2"/>
        <rect x="160" y="130" width="120" height="88" rx="16" fill="none" stroke="${C.kit2}" stroke-width="3"/>
        <circle cx="220" cy="174" r="7" fill="${C.amber}"/>
        <ellipse cx="220" cy="174" rx="22" ry="22" fill="${C.amber}" opacity=".4" filter="url(#${id})"/>
        <rect x="40" y="218" width="44" height="26" rx="5" fill="${C.kit2}"/>`;
    },
    plug(id) {
      return `<defs>${glow(id, 12)}</defs>
        <rect x="80" y="60" width="240" height="180" rx="20" fill="${C.cream}" opacity=".92"/>
        <rect x="92" y="72" width="216" height="156" rx="14" fill="none" stroke="#E0D9CC" stroke-width="3"/>
        <rect x="140" y="82" width="120" height="150" rx="22" fill="${C.kit}" stroke="${C.line}" stroke-width="2"/>
        <rect x="160" y="100" width="80" height="16" rx="8" fill="${C.kit2}"/>
        <circle cx="200" cy="168" r="18" fill="none" stroke="${C.amber}" stroke-width="5"/>
        <ellipse cx="200" cy="168" rx="26" ry="26" fill="${C.amber}" opacity=".35" filter="url(#${id})"/>
        <line x1="200" y1="156" x2="200" y2="168" stroke="${C.amber}" stroke-width="5" stroke-linecap="round"/>`;
    },
    bulb(id) {
      return `<defs>${glow(id, 26)}</defs>
        <circle cx="200" cy="120" r="78" fill="${C.amber}" opacity=".45" filter="url(#${id})"/>
        <path d="M200 52 a62 62 0 0 1 36 112 v18 h-72 v-18 a62 62 0 0 1 36 -112z" fill="${C.amber}"/>
        <rect x="166" y="186" width="68" height="14" rx="4" fill="${C.muted}"/>
        <rect x="170" y="204" width="60" height="12" rx="4" fill="${C.line}"/>
        <rect x="174" y="220" width="52" height="12" rx="4" fill="${C.muted}"/>
        <path d="M188 236 h24 l-6 14 h-12z" fill="${C.kit2}"/>`;
    },
    lamp(id) {
      return `<defs>${glow(id, 22)}</defs>
        <ellipse cx="200" cy="34" rx="130" ry="30" fill="${C.amber}" opacity=".5" filter="url(#${id})"/>
        <path d="M160 60 h80 l-14 30 h-52z" fill="${C.amber}"/>
        <rect x="196" y="90" width="8" height="170" fill="${C.kit2}"/>
        <ellipse cx="200" cy="266" rx="52" ry="12" fill="${C.kit}"/>`;
    },
    doorbell(id) {
      return `<defs>${glow(id, 12)}</defs>
        <rect x="60" y="30" width="110" height="240" fill="${C.kit}" opacity=".6"/>
        <rect x="160" y="40" width="80" height="220" rx="38" fill="${C.kit}" stroke="${C.line}" stroke-width="2"/>
        <circle cx="200" cy="96" r="24" fill="${C.ink}"/>
        <circle cx="200" cy="96" r="9" fill="${C.kit2}"/>
        <circle cx="200" cy="196" r="26" fill="none" stroke="${C.amber}" stroke-width="5"/>
        <ellipse cx="200" cy="196" rx="34" ry="34" fill="${C.amber}" opacity=".3" filter="url(#${id})"/>
        <circle cx="200" cy="196" r="14" fill="${C.kit2}"/>`;
    },
    vacuum(id) {
      return `<defs>${glow(id, 12)}</defs>
        <rect x="290" y="80" width="70" height="140" rx="14" fill="${C.kit}" stroke="${C.line}" stroke-width="2"/>
        <rect x="300" y="96" width="50" height="40" rx="8" fill="${C.kit2}"/>
        <circle cx="160" cy="160" r="96" fill="${C.kit}" stroke="${C.line}" stroke-width="3"/>
        <path d="M80 110 A96 96 0 0 1 240 110" fill="none" stroke="${C.kit2}" stroke-width="12" stroke-linecap="round"/>
        <circle cx="160" cy="150" r="22" fill="${C.kit2}"/>
        <circle cx="160" cy="150" r="7" fill="${C.amber}"/>
        <ellipse cx="160" cy="150" rx="20" ry="20" fill="${C.amber}" opacity=".35" filter="url(#${id})"/>
        <circle cx="160" cy="212" r="5" fill="${C.muted}"/>`;
    },
    sunrise(id) {
      return `<defs>${glow(id, 24)}<clipPath id="${id}c"><circle cx="200" cy="140" r="96"/></clipPath></defs>
        <circle cx="200" cy="140" r="96" fill="${C.kit}" stroke="${C.line}" stroke-width="3"/>
        <g clip-path="url(#${id}c)">
          <circle cx="200" cy="188" r="64" fill="${C.amber}" opacity=".55" filter="url(#${id})"/>
          <circle cx="200" cy="188" r="40" fill="${C.amber}"/>
          <rect x="100" y="188" width="200" height="60" fill="${C.kit}"/>
        </g>
        <rect x="150" y="242" width="100" height="22" rx="11" fill="${C.kit2}"/>`;
    }
  };

  window.kitArt = function (kit) {
    const id = 'g' + (++n);
    const body = (draw[kit] || draw.hub)(id);
    return `<svg viewBox="0 0 400 300" role="img" aria-hidden="true" focusable="false">${body}</svg>`;
  };
})();
