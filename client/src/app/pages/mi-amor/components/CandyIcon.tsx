import type { CandyKind, SpecialCandy } from '../types';
import { classNames } from '../utils/classNames';

type CandyIconProps = { kind: CandyKind; special?: SpecialCandy };

/** Los rayados se recortan con la silueta de su fruta, así que hay uno por fruta. */
function overlayId(kind: CandyKind, special: SpecialCandy): string {
  return special === 'striped-h' || special === 'striped-v' ? `special-${special}-${kind}` : `special-${special}`;
}

/** Dibuja una fruta (y su capa especial, si tiene) usando los sprites de <CandySprites />. */
export function CandyIcon({ kind, special }: CandyIconProps) {
  return (
    <span className={classNames('candy-icon-wrap', special && `is-special is-${special}`)}>
      <svg className={`candy-art candy-art-${kind}`} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
        <use href={`#candy-${kind}`} />
        {special && <use className={`special-overlay special-${special}`} href={`#${overlayId(kind, special)}`} />}
        {special === 'color-bomb' && <use className="bomb-ring" href="#special-color-bomb-ring" />}
      </svg>
    </span>
  );
}
