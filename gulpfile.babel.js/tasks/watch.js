//Task:Watch
import gulp            from 'gulp'
import { globs }       from '../config'
import { buildCss }    from './css'
import { buildJs }     from './js'
import { reload }      from './html'
import { browsersync, browsersyncStream } from './browsersync'

const watcher = (done) => {
  gulp.watch(globs.sass, { interval: 500 }, buildCss);
  gulp.watch(globs.js, { interval: 500 }, buildJs);
  gulp.watch(globs.html, { interval: 500 }, reload);
  done();
}

exports.watcher = watcher;