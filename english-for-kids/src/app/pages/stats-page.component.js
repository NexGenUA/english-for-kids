import { Component } from '../../lib';
import { cards } from '../../lib/data/cards';

class StatsPageComponent extends Component {
  getStat() {
    return localStorage.getItem('stat');
  }

  events() {
    return {
      'click #stats-game': 'sortTable',
      'click #repeat-words': 'goToRepeatPage',
      'click #reset-stats': 'resetStats',
    };
  }

  resetStats() {
    localStorage.removeItem('stat');
    this.onLoad();
  }

  goToRepeatPage(e) {
    e.preventDefault();
    const link = document.getElementById('repeat-link');
    if (!link) return;
    const event = new Event('click', { bubbles: true });
    link.dispatchEvent(event);
  }

  sortTable(e) {
    const th = e.target;
    const tableContent = document.getElementById('table-content');

    const sortTable = (idx, type, asc) => {
      const rowsArray = Array.from(tableContent.rows);
      let compare;

      if (type === 'number') {
        compare = (rowA, rowB) => rowA.cells[idx].innerHTML - rowB.cells[idx].innerHTML;
      } else {
        compare = (rowA, rowB) => (rowA.cells[idx].innerHTML > rowB.cells[idx].innerHTML ? 1 : -1);
      }
      rowsArray.sort(compare);

      if (asc) rowsArray.reverse();

      tableContent.append(...rowsArray);
    };

    if (!th || !tableContent || th.tagName !== 'TH') return;
    const ths = th.parentNode.querySelectorAll('th');
    let asc;

    ths.forEach(el => {
      if (el === th) {
        asc = th.classList.contains('asc');
        th.classList.add('sorted');

        if (asc) {
          th.classList.remove('asc');
        } else {
          th.classList.add('asc');
        }
        return;
      }
      el.removeAttribute('class');
    });

    tableContent.className = `sorted-col-${th.cellIndex + 1}`;
    sortTable(th.cellIndex, th.dataset.type, asc);
  }

  onLoad() {
    const table = document.getElementById('stats-game');
    const categories = cards.categories.map(cat => ({ name: cat.name, key: cat.url.slice(1) }));
    let tbody = '';
    let json = this.getStat();

    if (json) json = JSON.parse(json);

    categories.forEach(el => {
      tbody += `${cards[el.key].map(group => {
        let click = 0; let guessed = 0; let error = 0; let percent = '';
        const wordStat = json ? json[group.word] : 0;

        if (json) {
          click = wordStat ? wordStat.click : 0;
          guessed = wordStat ? wordStat.guessed : 0;
          error = wordStat ? wordStat.error : 0;
          if (guessed && !error) {
            percent = 0;
          } else if (!guessed && error) {
            percent = 100;
          } else if (guessed && error) {
            percent = (error / (guessed + error) * 100).toFixed(2);
          }
        }

        return `
        <tr>
          <td class="td-1 fixed-col">
            ${group.word[0].toUpperCase()}${group.word.slice(1)}
          </td>
          <td class="td-2">${el.name}</td>
          <td class="td-3">
            ${group.translation[0].toUpperCase()}${group.translation.slice(1)}
          </td>
          <td class="td-4">${click}</td>
          <td class="td-5">${guessed}</td>
          <td class="td-6">${error}</td>
          <td class="td-7">${percent}</td>
        </tr>`;
      }).join('')}
        `;
    });
    table.tBodies[0].innerHTML = tbody;
  }
}

export const statsPageComponent = new StatsPageComponent({
  selector: '#app-stats-page',
  template: require('./html/stats.html'),
  title: () => 'Stats',
});
