import '@picocss/pico/css/pico.green.min.css';
import calculator from './bucket-calculator'; // 👀 Notice no file extension
import * as ui from './browser-ui';

console.log('Homework 11 main.js loaded');

// Setup marks-to-date
calculator.setAssignmentTotal(26);
calculator.addBucket('2/2');
// TODO: Add more marks...

let stats = calculator.getStats();

// Render the contents to the browser
ui.displayHeading('Assignment 1 - Mark Breakdown');
ui.print();
ui.print('trending', stats.trending);
ui.print('earned-to-date', stats.earnedToDate);
ui.table(calculator.buckets);

ui.fillCredits(2026, 'Stew Dent');
