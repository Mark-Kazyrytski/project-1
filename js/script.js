/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

/* jshint -W117 */
/* jshint -W097 */
'use strict';


document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    
    let adImages = document.querySelectorAll('.promo__adv img'),
        poster = document.querySelector('.promo__bg'),
        genre = poster.querySelector('.promo__genre'),
        movieList = document.querySelector('.promo__interactive-list'),
        addForm = document.querySelector('form.add'),
        addInput = document.querySelector('.adding__input'),
        checkBox = document.querySelector('[type="checkbox"]');

    addForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let newFilm = addInput.value;
        const favorite = checkBox.checked;
        if (newFilm) {
            if (newFilm.length > 21) {
                newFilm = newFilm.substring(0, 21) + '...';
            }
            if (favorite) {
                console.log("Добавляем любимый фильм");
            }
            movieDB.movies.push(newFilm);
            renderMovieList(movieDB.movies, movieList);
        }

        event.target.reset();
    });
    
    const deleteAdv = (arr) => {
        arr.forEach(element => element.remove());
    };

    const makeChanges = () => {
        genre.textContent = 'драма';
        poster.style.backgroundImage = 'url("img/bg.jpg")';
    };
    makeChanges();

    const sortArr = (arr) => {
        arr.sort();
    };

    function renderMovieList(films, parent) {
        parent.innerHTML = '';
        sortArr(films);
        films.forEach((movie, index) => {
            parent.innerHTML += `
            <li class="promo__interactive-item">
                ${index + 1}. ${movie}
                <div class="delete"></div>
            </li>
        `;
        });

        parent.querySelectorAll('.delete').forEach((trashCan, i) => {
            trashCan.addEventListener('click', event => {
                films.splice(i, 1);
                renderMovieList(films, parent);
            });
        });
    }

    deleteAdv(adImages);
    renderMovieList(movieDB.movies, movieList);
});