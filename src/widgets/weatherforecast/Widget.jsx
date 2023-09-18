import styles from './widget.module.scss'
import { Footer } from '../../components/index'
import { OverlayWF } from './ui-blocks/overlay-wf/OverlayWF'
import { HeaderWF } from './ui-blocks/header-wf/HeaderWF'
import { CardView } from './features/card-view/CardView'
import { SearchControlView } from './features/search-control-view/SearchControlView'

function Widget() {
  return (
    <div className={styles.App}>
      <div className={styles.weatherForecast}>
        <OverlayWF>
          <HeaderWF />
          <SearchControlView />
          <CardView />
        </OverlayWF>
      </div>
      <Footer className={styles.footer} />
    </div>
  );
}

export default Widget;
