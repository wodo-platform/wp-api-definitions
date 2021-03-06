import { parse } from '@asyncapi/modelina/node_modules/@asyncapi/parser/lib';

//var Generator = require('@asyncapi/generator/lib')

const Generator = require('@asyncapi/generator/lib/generator');



import * as fs from 'fs';
import { exit } from 'process';

const serviceName = "wg-gaming-service"
console.log("Running API docs generation script for " + serviceName);
const generatedRootDir = "dist/public/";

//if(fs.existsSync(generatedRootDir)) {
//    fs.rmSync(generatedRootDir,{recursive : true});
//}

fs.mkdirSync(generatedRootDir,{recursive : true});

const file = fs.readFileSync('src/service/'+serviceName+'/async/asyncapi.yaml', 'utf-8');

const generator = new Generator('@asyncapi/html-template', generatedRootDir, {
    templateParams: {
      outFilename: serviceName+'-api.html',
      singleFile: true
    }
  });

export async function generate(): Promise<void> {

    try {
        //const parsedDoc = await parse(file);
        await generator.generateFromFile('src/service/'+serviceName+'/async/asyncapi.yaml')
        //await generator.generate(parsedDoc);
        console.log('Done!');
      } catch (error) {
        console.log("enrror orrcurred while generating api documentation for "+serviceName+"..exiting the build process:" + error);
        //exit(1);
        // TODO: fix htm generation errors
      }
};

generate();

