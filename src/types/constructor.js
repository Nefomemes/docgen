const DocumentedItem = require('./item');
const DocumentedParam = require('./param');

/*
{ id: 'Client()',
  longname: 'Client',
  name: 'Client',
  kind: 'constructor',
  description: 'Creates an instance of Client.',
  memberof: 'Client',
  params:
   [ { type: [Object],
       optional: true,
       description: 'options to pass to the client',
       name: 'options' } ],
  order: 10 }
*/

class DocumentedConstructor extends DocumentedItem {
	registerMetaInfo(data) {
		super.registerMetaInfo(data);
		this.directData = data;
		const newParams = [];
		for(const param of data.params) newParams.push(new DocumentedParam(this, param));
		this.directData.params = newParams;
	}

	serialize() {
		super.serialize();
		const { name, description, access, params } = this.directData;
		return {
			name,
			description,
			access,
			params: params.map(p => p.serialize())
		};
	}
}

module.exports = DocumentedConstructor;
