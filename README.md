# Kanban
Система управления тасками.

## Функционал
Есть возможность добавлять и удалять задачи, редактировать и перемещать их между стадиями.
Также можно редактировать название стадии.

## Сервер разработки
Выполните команду `ng serve` для старта. После чего перейдите по адресу `http://localhost:4200/`. Изменения подхватятся автоматически при изменении исходных файлов.

## Подключение к рест-серверу на Java 
Проверяем что установлена java: C:\git\my-angular-project\src\resources> java -version 
Если не установлена, то скачиваем 8 версию (JRE)

Запускаем jar-файл с сервером: C:\git\my-angular-project\src\resources> java -jar <название файла>

Посмотреть содержимое базы данных:
1. Перейти по адресу `localhost:8080/h2`.
2. Проверить что в пункте JDBC URL указано значение:jdbc:h2:~/kanban
3. Нажать на кнопку Connect
4. В появившемся окне можно вводить SQL-запросы

