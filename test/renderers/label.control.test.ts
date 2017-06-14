import test from 'ava';
// inject window, document etc.
import 'jsdom-global/register';
import * as installCE from 'document-register-element/pony';
declare let global;
installCE(global, 'force');
import {LabelElement} from '../../src/models/uischema';
import {JsonSchema} from '../../src/models/jsonSchema';
import {labelRendererTester, LabelRenderer} from '../../src/renderers/additional/label.renderer';
import {Runtime} from '../../src/core/runtime';
import {DataService } from '../../src/core/data.service';


test('Label tester', t => {
  t.is(
      labelRendererTester(undefined, undefined),
      -1
  );
  t.is(
      labelRendererTester(null, undefined),
      -1
  );
  t.is(
      labelRendererTester({type: 'Foo'}, undefined),
      -1
  );
  t.is(
      labelRendererTester({type: 'Label'}, undefined),
      1
  );
});
test('Render Label with static undefined text', t => {
  const schema = {type: 'object', properties: {name: {type: 'string'}}} as JsonSchema;
  const renderer: LabelRenderer = new LabelRenderer();
  const data = {'name': 'Foo'};
  renderer.setDataService(new DataService(data));
  renderer.setDataSchema(schema);
  renderer.setUiSchema({type: 'Label'} as LabelElement);
  const result = renderer.render();
  t.is(result.className, 'jsf-label');
  t.is(result.childNodes.length, 0);
  t.is(result.textContent, '');
});
test('Render Label with static null text', t => {
  const schema = {type: 'object', properties: {name: {type: 'string'}}} as JsonSchema;
  const renderer: LabelRenderer = new LabelRenderer();
  const data = {'name': 'Foo'};
  renderer.setDataService(new DataService(data));
  renderer.setDataSchema(schema);
  renderer.setUiSchema({type: 'Label', text: null} as LabelElement);
  const result = renderer.render();
  t.is(result.className, 'jsf-label');
  t.is(result.childNodes.length, 0);
  t.is(result.textContent, '');
});
test('Render Label with static text', t => {
  const schema = {type: 'object', properties: {name: {type: 'string'}}} as JsonSchema;
  const renderer: LabelRenderer = new LabelRenderer();
  const data = {'name': 'Foo'};
  renderer.setDataService(new DataService(data));
  renderer.setDataSchema(schema);
  renderer.setUiSchema({type: 'Label', text: 'Bar'} as LabelElement);
  const result = renderer.render();
  t.is(result.className, 'jsf-label');
  t.is(result.childNodes.length, 1);
  t.is(result.textContent, 'Bar');
});
test('Hide Label', t => {
  const renderer: LabelRenderer = new LabelRenderer();
  const labelElement = {type: 'Label', text: 'Bar'} as LabelElement;
  const data = {'name': 'Foo'};
  const dataService = new DataService(data);
  renderer.setDataService(dataService);
  const schema = {type: 'object', properties: {name: {type: 'string'}}} as JsonSchema;
  renderer.setDataSchema(schema);
  renderer.setUiSchema(labelElement);
  renderer.connectedCallback();
  const runtime = <Runtime>labelElement['runtime'];
  runtime.visible = false;
  t.is(renderer.hidden, true);
});
test('Show Label', t => {
  const renderer: LabelRenderer = new LabelRenderer();
  const labelElement = {type: 'Label', text: 'Bar'} as LabelElement;
  const data = {'name': 'Foo'};
  const dataService = new DataService(data);
  renderer.setDataService(dataService);
  const schema = {type: 'object', properties: {name: {type: 'string'}}} as JsonSchema;
  renderer.setDataSchema(schema);
  renderer.setUiSchema(labelElement);
  renderer.connectedCallback();
  const runtime = <Runtime>labelElement['runtime'];
  runtime.visible = true;
  t.is(renderer.hidden, false);
});

test('Disable Label', t => {
  const renderer: LabelRenderer = new LabelRenderer();
  const labelElement = {type: 'Label', text: 'Bar'} as LabelElement;
  const data = {'name': 'Foo'};
  const dataService = new DataService(data);
  renderer.setDataService(dataService);
  const schema = {type: 'object', properties: {name: {type: 'string'}}} as JsonSchema;
  renderer.setDataSchema(schema);
  renderer.setUiSchema(labelElement);
  renderer.connectedCallback();
  const runtime = <Runtime>labelElement['runtime'];
  runtime.enabled = false;
  t.is(renderer.getAttribute('disabled'), 'true');
});
test('Enable Label', t => {
  const renderer: LabelRenderer = new LabelRenderer();
  const labelElement = {type: 'Label', text: 'Bar'} as LabelElement;
  const data = {'name': 'Foo'};
  const dataService = new DataService(data);
  renderer.setDataService(dataService);
  const schema = {type: 'object', properties: {name: {type: 'string'}}} as JsonSchema;
  renderer.setDataSchema(schema);
  renderer.setUiSchema(labelElement);
  renderer.connectedCallback();
  const runtime = <Runtime>labelElement['runtime'];
  runtime.enabled = true;
  t.false(renderer.hasAttribute('disabled'));
});
test('Label should not be hidden if disconnected', t => {
  const renderer: LabelRenderer = new LabelRenderer();
  const labelElement = {type: 'Label', text: 'Bar'} as LabelElement;
  const data = {'name': 'Foo'};
  const dataService = new DataService(data);
  renderer.setDataService(dataService);
  const schema = {type: 'object', properties: {name: {type: 'string'}}} as JsonSchema;
  renderer.setDataSchema(schema);
  renderer.setUiSchema(labelElement);
  renderer.connectedCallback();
  renderer.disconnectedCallback();
  const runtime = <Runtime>labelElement['runtime'];
  runtime.visible = false;
  t.is(renderer.hidden, false);
});
test('Label should not be disabled if disconnected', t => {
  const renderer: LabelRenderer = new LabelRenderer();
  const labelElement = {type: 'Label', text: 'Bar'} as LabelElement;
  const data = {'name': 'Foo'};
  const dataService = new DataService(data);
  renderer.setDataService(dataService);
  const schema = {type: 'object', properties: {name: {type: 'string'}}} as JsonSchema;
  renderer.setDataSchema(schema);
  renderer.setUiSchema(labelElement);
  renderer.connectedCallback();
  renderer.disconnectedCallback();
  const runtime = <Runtime>labelElement['runtime'];
  runtime.enabled = false;
  t.false(renderer.hasAttribute('disabled'));
});
