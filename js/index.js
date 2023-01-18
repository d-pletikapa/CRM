import {goods} from './getGoods.js';
import {renderCrmPrice, renderGoods} from './renderCrm.js';
{
  const init = () => {
    renderGoods(goods);
    renderCrmPrice();
  };
  init();
}


