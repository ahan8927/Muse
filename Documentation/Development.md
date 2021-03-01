<div align="center">

# Development of Muse

This section details the technical aspects of this project's development.  
To learn what Muse is, its features, and how to use it, see the [README](../README.md).

**TOC**  
[Technologies](#technologies) ● [Concept](#wireframes-and-styling) ● [Models](#models) ● [Routes](#routes) ● [Wireframes](#wireframes) ● [Dev Snapshots](#development-snapshots) ● [Contact](#contact)

</div>

<div align="center">

## Technologies

</div>

- **LANGUAGES** JavaScript, Python 3, CSS
- **FRONTEND** React, React Router, Redux, styled-components, MUI
- **BACKEND** Flask, SQLAlchemy, PostgreSQL, Alembic
- **TOOLS** Docker, Heroku, Visual Studio Code, Redux-logger
- **LIBRARIES** Tone.js, beautiful-react-dnd, react-heatmap-grid, Flask-WTF, WTForms, Mashmallow-SQLAlchemy, Werkzeug, react-modal, react-animated-slider

<div align="center">

## Concept

</div>

**DESIGN** Minimalistic design catered towards an intuitive, non intrusive and seemless user experience to allow the transfer of ideas without distraction.

**COLOR SCHEME** Street styled, dark alley, with neon colors inspired the main color splash of the application. Nothing too flashy as to become distracting, but still clean and aesthetic with a hint of modern design, to provide a pleasing productive workbench experience for Artists.


<div align="center">

## Models

  **TABLES**  
  [users](#users) | [memberships](#memberships) | [programs](#programs) | [activities](#activities) | [stamps](#stamps) | [rewards](#rewards) | [receipts](#receipts) | [colors](#colors) | [icons](#icons) | [bonds](#bonds)
  
</div>

The database schema evolved and changed quite a bit continually throughout the process to accommodate new ideas, cleaner pipelines, and future features. A few examples exist of the schemas we drew up during the process, but likely by the time of this reading, the models written here are somehow out of date.

<div align="center">

  **Original Schema and a Mid-development Schema**

  <img src="images/schema-1.png" alt="Schema of database tables" width="48%"> 
  <img src="images/schema-3.PNG" alt="Schema of database tables" width="48%">

</div>

### `users`
| users      | Constraints                                   |
| ---------- | --------------------------------------------- |
| id         | SERIAL, PRIMARY KEY                           |
| first_name | VARCHAR(25) NOT NULL                          |
| last_name  | VARCHAR(25) NOT NULL                          |
| username   | VARCHAR(25) NOT NULL                          |
| birthday   | DATE                                          |
| email      | VARCHAR(320), NOT NULL, UNIQUE                |
| hashword   | VARCHAR(255) NOT NULL                         |
| color_id   | FOREIGN KEY(colors.id), NOT NULL              |
| stamp_id   | FOREIGN KEY(stamps.id), NOT NULL              |
| pids_order | ARRAY(INTEGER), NOT NULL, DEFAULT VALUE=[]    |
| is_private | BOOLEAN, NOT NULL, DEFAULT VALUE=False        |
| created_at | TIMESTAMP, NOT NULL, DEFAULT VALUE=new Date() |

### `programs`
| columns       | Constraints                                   |
| ------------- | --------------------------------------------- |
| id            | SERIAL, PRIMARY KEY                           |
| title         | VARCHAR(25), NOT NULL                         |
| description   | VARCHAR(250)                                  |
| color_id      | FOREIGN KEY(colors.id), NOT NULL              |
| stamp_id      | FOREIGN KEY(stamps.id), NOT NULL              |
| aids_order    | ARRAY(INTEGER), NOT NULL, DEFAULT VALUE=[]    |
| rew_ids_order | ARRAY(INTEGER), NOT NULL, DEFAULT VALUE=[]    |
| is_private    | BOOLEAN, NOT NULL, DEFAULT VALUE=False        |
| creator_id    | INTEGER, FOREIGN KEY=users.id, NOT NULL       |
| created_at    | TIMESTAMP, NOT NULL, DEFAULT VALUE=new Date() |

### `memberships`
| columns    | Constraints                                |
| ---------- | ------------------------------------------ |
| id         | SERIAL, PRIMARY KEY                        |
| program_id | INTEGER, FOREIGN KEY=programs.id, NOT NULL |
| member_id  | INTEGER, FOREIGN KEY=users.id, NOT NULL    |
| stamper_id | INTEGER, FOREIGN KEY=users.id              |
| points     | INTEGER, NOT NULL, DEFAULT VALUE=0         |

### `activities`
| activities  | Constraints                                   |
| ----------- | --------------------------------------------- |
| id          | SERIAL, PRIMARY KEY                           |
| title       | VARCHAR(25), NOT NULL                         |
| description | VARCHAR(250)                                  |
| frequency   | INTEGER, NOT NULL, DEFAULT VALUE=1            |
| color_id    | FOREIGN KEY(colors.id), NOT NULL              |
| stamp_id    | FOREIGN KEY(stamps.id), NOT NULL              |
| program_id  | INTEGER, FOREIGN KEY=programs.id, NOT NULL    |
| creator_id  | INTEGER, FOREIGN KEY=users.id, NOT NULL       |
| created_at  | TIMESTAMP, NOT NULL, DEFAULT VALUE=new Date() |


### `stamps`
| columns     | Constraints                                      |
| ----------- | ------------------------------------------------ |
| id          | SERIAL, PRIMARY KEY                              |
| date        | DATE, NOT NULL                                   |
| status      | VARCHAR(25), NOT NULL, DEFAULT VALUE="unstamped" |
| member_id   | INTEGER, FOREIGN KEY=users.id, NOT NULL          |
| activity_id | INTEGER, FOREIGN KEY=activities.id, NOT NULL     |

### `rewards`
| columns          | Constraints                         |
| ---------------- | ----------------------------------- |
| id               | SERIAL, PRIMARY KEY                 |
| type             | VARCHAR(25), DEFAULT VALUE="custom" |
| title            | VARCHAR(50), NOT NULL               |
| description      | VARCHAR(250)                        |
| cost             | INTEGER, NOT NULL, DEFAULT VALUE=5  |
| color_id         | FOREIGN KEY(colors.id), NOT NULL    |
| stamp_id         | FOREIGN KEY(stamps.id), NOT NULL    |
| limit_per_member | INTEGER, NOT NULL, DEFAULT VALUE=-1 |
| quantity         | INTEGER, NOT NULL, DEFAULT VALUE=1  |
| program_id       | INTEGER, FOREIGN KEY=programs.id    |
| creator_id       | INTEGER, FOREIGN KEY=users.id       |
| created_at       | TIMESTAMP, DEFAULT VALUE=new Date() |

### `receipts`
| user_rewards | Constraints                                   |
| ------------ | --------------------------------------------- |
| id           | SERIAL, PRIMARY KEY                           |
| user_id      | INTEGER, FOREIGN KEY=users.id, NOT NULL       |
| reward_id    | INTEGER, FOREIGN KEY=rewards.id, NOT NULL     |
| created_at   | TIMESTAMP, DEFAULT VALUE=new Date(), NOT NULL |

## `bonds`
| columns  | Constraints                             |
| -------- | --------------------------------------- |
| id       | SERIAL, PRIMARY KEY                     |
| user_id  | INTEGER, FOREIGN KEY=users.id, NOT NULL | combo-unique |
| buddy_id | INTEGER, FOREIGN KEY=users.id, NOT NULL |


<div align="center">

## Routes

</div>

### Frontend
| METHOD | Route Path                                | Purpose                                                              |
| ------ | ----------------------------------------- | -------------------------------------------------------------------- |
| GET    | `/`                                       | splash page, if no auth                                              |
| GET    | `/`                                       | user homepage, if auth checks                                        |
| GET    | `/about`                                  | about page                                                           |
| GET    | `/logout`                                 | logout user                                                          |
| GET    | `/activities/:hid/memberships/:mid`       | activity history page for a user's activity (public/private options) |
| GET    | `/programs/:pid/memberships/:mid/rewards` | reward shop for a user and program                                   |
| <!--   | GET                                       | `/users/:uid`                                                        | user's public profile page                   | --> |
| <!--   | GET                                       | `/users/:uid/receipts`                                               | user's receipts reward history               | --> |
| <!--   | GET                                       | `/programs/:pid/receipts`                                            | user's receipts reward history for a program | --> |
| <!--   | GET                                       | `/users/:uid/bonds`                                                  | user's bonds                                 | --> |

### Backend
#### ROOT: `/users`
| METHOD | Route Path       | Purpose                                                       |
| ------ | ---------------- | ------------------------------------------------------------- |
| POST   | `/`              | Validate signup and make new user account.                    |
| GET    | `/:uid`          | Get `user` information                                        |
| PATCH  | `/:uid`          | Authenticate and edit `user` details                          |
| DELETE | `/:uid`          | Delete a `user` account                                       |
| GET    | `/:uid/auth`     | Not sure, but I think we may need a route just to check auth? |
| GET    | `/:uid/programs` | Get all a `user`'s subscribed `programs`.                     |
| GET    | `/:uid/receipts` | Get all a `user`'s `redeem`ed rewards.                        |
| <!--   | GET              | `/:uid/bonds`                                                 | Get all a `user`'s `bond`s.                                 | --> |
| <!--   | POST             | `/:uid/bonds`                                                 | Create a `bond` with another `user`.                        | --> |
| <!--   | DELETE           | `/:uid/bonds/:bid`                                            | Delete a `bond` with a `user`.                              | --> |
| <!--   | GET              | `/:uid/receipts/:type`                                        | Get all a `user`'s `redeem`ed rewards of a specific `type`. | --> |

#### ROOT: `/programs`
| METHOD | Route Path            | Purpose                                                              |
| ------ | --------------------- | -------------------------------------------------------------------- |
| POST   | `/`                   | Create a new `program`.                                              |
| GET    | `/:pid`               | Get a `program`'s details.                                           |
| PATCH  | `/:pid`               | Edit a `program`.                                                    |
| DELETE | `/:pid`               | Delete a `program`.                                                  |
| GET    | `/:pid/stampers`      | Get all a `program`'s `stamper`s.                                    |
| GET    | `/:pid/stampers/:uid` | Get a specific `stamper` and the member(s) they are accountable for. |

#### ROOT: `/programs/:pid/members`
| METHOD | Route Path              | Purpose                                                                                      |
| ------ | ----------------------- | -------------------------------------------------------------------------------------------- |
| GET    | `/`                     | Get a `program`'s `member`s.                                                                 |
| POST   | `/:uid`                 | Add a `member` to the `program`.                                                             |
| DELETE | `/:uid`                 | Delete a `member` from the `program`.                                                        |
| GET    | `/:uid/activities`      | Get a `member`'s `activity`s for a `program`, including last seven days of history for each. |
| GET    | `/:uid/activities/:hid` | Get a `user` `activity`'s details, including full history (via `stamp_checks`)               |
| GET    | `/:uid/stamper`         | Get a `member`'s `stamper` in the `program`.                                                 |
| PATCH  | `/:uid/stamper`         | Change a `member`'s `stamper` in the `program`.                                              |
| DELETE | `/:uid/stamper`         | Unassign the assigned `stamper`.                                                             |

#### ROOT: `/programs/:pid/activities`
| METHOD | Route Path | Purpose                                                                                        |
| ------ | ---------- | ---------------------------------------------------------------------------------------------- |
| GET    | `/`        | Get all a `program`'s `activities`, including last seven days of history for each.             |
| GET    | `/:hid`    | Get a `activity`'s details, including full histories for from all members (via `stamp_checks`) |
| POST   | `/`        | Create a `activity` for a `program`.                                                           |
| PATCH  | `/:hid`    | Edit a `activity` for a `program`.                                                             |
| DELETE | `/:hid`    | Delete a `activity` for a `program`.                                                           |

#### ROOT: `/programs/:pid/activities/:hid/members/:uid`
| METHOD | Route Path | Purpose                                                  |
| ------ | ---------- | -------------------------------------------------------- |
| POST   | `/stamp`   | Change status of associated `daily_stamp` to 'stamped'   |
| DELETE | `/`        | Change status of associated `daily_stamp` to 'unstamped' |
| POST   | `/ping`    | Change status of associated `daily_stamp` to 'pending'   |

#### ROOT: `/rewards`
| METHOD | Route Path | Purpose                             |
| ------ | ---------- | ----------------------------------- |
| GET    | `/`        | Get all default rewards.            |
| GET    | `/:type`   | Get all rewards of a specific type. | <-- default-permanent options only |

#### ROOT: `/programs/:pid/rewards`
| METHOD | Route Path                | Purpose                                 |
| ------ | ------------------------- | --------------------------------------- |
| GET    | `/`                       | Get all a `program`'s custom `reward`s. |
| POST   | `/`                       | Create a new custom `reward`.           |
| PATCH  | `/:rid`                   | Edit a custom `reward`.                 |
| DELETE | `/:rid`                   | Delete a custom `reward`.               |
| POST   | `/:rid/redeem/users/:uid` | Redeem a `reward` for a `user`          | <-- effects points |

<!--
| METHOD | Route Path | Purpose |
| ------ | ---------- | ------- |
|        |            |         |
|        |            |         |
|        |            |         |
-->

<div align="center">

## Wireframes

Drawings from design and planning process TBA.

</div>


<div align="center">

## Development Snapshots

</div>

<div align="center">
<!-- <img src="images/dev-1.PNG" height="350px">
<img src="images/dev-2.PNG" height="350px">
<img src="images/dev-3.PNG" height="350px"> -->

<!-- <img src="images/dev-6.PNG" height="350px">
<img src="images/dev-10.PNG" height="350px"> -->

<!-- <img src="images/dev-5.PNG" height="350px">
<img src="images/dev-7.png" height="350px">
<img src="images/dev-8.PNG" height="350px"> -->

<!-- <img src="images/dev-11.PNG" height="350px"> -->
<!-- <img src="images/dev-9.PNG" height="350px"> -->
<!-- <img src="images/dev-12.PNG" height="350px"> -->
</div>

  <!-- - red-violet-crayola: #af4d98ff;
  - wild-orchid: #d66ba0ff;
  - pastel-pink: #e5a9a9ff;
  - dutch-white: #f4e4baff;
  - celeste: #baf2e9ff;
  - granny-smith-apple: #b0f2b4ff;
  - magic-mint: #9df7e5ff;
  - blizzard-blue: #b8f3ffff;
  - middle-blue: #8ac6d0ff;
  - cadet-blue: #58a4b0ff;
  - dark-slate-blue: #54478cff;
  - sapphire-blue: #2c699aff;
  - blue-munsell: #048ba8ff;
  - keppel: #0db39eff;
  - medium-aquamarine: #16db93ff;
  - light-green: #83e377ff;
  - inchworm: #b9e769ff;
  - corn: #efea5aff;
  - maize-crayola: #f1c453ff;
  - sandy-brown: #f29e4cff; -->


---

<div align="center">

## Contact Me

Thank you for taking a look at Persistamp! :D  
Please feel free to reach out and ask us anything.
</div>

### Aaron Hanson
*(Full-stack developer, Open to work)*
<a href="readme/Lee_David_Resume(v2.0).pdf" download>![Resume PDF](https://img.shields.io/badge/-Resume-f00?style=flat-square&logo=adobe-acrobat-reader&logoColor=white)</a>
[![Aaron Hanson's email](https://img.shields.io/badge/aaron.hanson.brb@gmail.com-f4b400?style=flat-square&logo=gmail&logoColor=black&link=mailto:dyclee@umich.edu)](mailto:aaron.hanson.brb@gmail.com)
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-0077b5?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/aaron-hanson-brb/)](https://www.linkedin.com/in/aaron-hanson-brb/)
[![GitHub ahan8927](https://img.shields.io/github/followers/ahan8927?label=follow&style=social)](https://github.com/ahan8927)
