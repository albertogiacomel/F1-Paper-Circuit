import { AUSTRALIA } from './season_2025_01_australia';
import { CHINA } from './season_2025_02_china';
import { JAPAN } from './season_2025_03_japan';
import { BAHRAIN } from './season_2025_04_bahrain';
import { SAUDI_ARABIA } from './season_2025_05_saudi';
import { MIAMI } from './season_2025_06_miami';
import { IMOLA } from './season_2025_07_imola';
import { MONACO } from './season_2025_08_monaco';
import { SPAIN } from './season_2025_09_spain';
import { CANADA } from './season_2025_10_canada';
import { AUSTRIA } from './season_2025_11_austria';
import { SILVERSTONE } from './season_2025_12_silverstone';
import { SPA } from './season_2025_13_spa';
import { HUNGARY } from './season_2025_14_hungary';
import { ZANDVOORT } from './season_2025_15_zandvoort';
import { ITALY } from './season_2025_16_italy';
import { AZERBAIJAN } from './season_2025_17_azerbaijan';
import { SINGAPORE } from './season_2025_18_singapore';
import { USA } from './season_2025_19_usa';
import { MEXICO } from './season_2025_20_mexico';
import { BRAZIL } from './season_2025_21_brazil';
import { LAS_VEGAS } from './season_2025_22_las_vegas';
import { QATAR } from './season_2025_23_qatar';
import { ABU_DHABI } from './season_2025_24_abu_dhabi';
import { TrackDefinition } from '../../types/index';

export const MAPS: Record<string, TrackDefinition> = {
  australia: AUSTRALIA,
  china: CHINA,
  japan: JAPAN,
  bahrain: BAHRAIN,
  saudi: SAUDI_ARABIA,
  miami: MIAMI,
  imola: IMOLA,
  monaco: MONACO,
  spain: SPAIN,
  canada: CANADA,
  austria: AUSTRIA,
  silverstone: SILVERSTONE,
  spa: SPA,
  hungary: HUNGARY,
  zandvoort: ZANDVOORT,
  italy: ITALY,
  azerbaijan: AZERBAIJAN,
  singapore: SINGAPORE,
  usa: USA,
  mexico: MEXICO,
  brazil: BRAZIL,
  las_vegas: LAS_VEGAS,
  qatar: QATAR,
  abu_dhabi: ABU_DHABI,
};

export const ACTIVE_MAP = MAPS.australia;