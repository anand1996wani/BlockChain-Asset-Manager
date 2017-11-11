/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Sample transaction processor function.
 * @param {org.acme.sample.SampleTransaction} tx The sample transaction instance.
 * @transaction
 */
function sampleTransaction(tx) {

  if(tx.type=='rented')
  {
    // Save the old value of the asset.
    var oldValue = tx.asset.value;

    // Update the asset with the new value.
    tx.asset.value = tx.newValue;
  
  	var oldOwner=tx.oldOwner;
    var newOwner=tx.newOwner;
  	tx.asset.current_occupant = newOwner;

    // Get the asset registry for the asset.
    return getAssetRegistry('org.acme.sample.LandAsset')
        .then(function (assetRegistry) {

            // Update the asset in the asset registry.
            return assetRegistry.update(tx.asset);
      		return assetRegistry.update(tx.current_occupant);

        })
        .then(function () {

            // Emit an event for the modified asset.
            var event = getFactory().newEvent('org.acme.sample', 'SampleEvent');
            event.asset = tx.asset;
            event.oldValue = oldValue;
            event.newValue = tx.newValue;
      		event.oldOwner = tx.oldOwner;
      		event.newOwner = tx.newOwner;
      
            emit(event);

        });
  }
  
  else if(tx.type=='bought')
  {
        // Save the old value of the asset.
    var oldValue = tx.asset.value;

    // Update the asset with the new value.
    tx.asset.value = tx.newValue;
  
  	var oldOwner=tx.oldOwner;
    var newOwner=tx.newOwner;
  	tx.asset.current_occupant = newOwner;
	tx.asset.owner=newOwner;
    // Get the asset registry for the asset.
    return getAssetRegistry('org.acme.sample.LandAsset')
        .then(function (assetRegistry) {

            // Update the asset in the asset registry.
            return assetRegistry.update(tx.asset);
      		return assetRegistry.update(tx.current_occupant);
      		return assetRegistry.update(tx.owner);

        })
        .then(function () {

            // Emit an event for the modified asset.
            var event = getFactory().newEvent('org.acme.sample', 'SampleEvent');
            event.asset = tx.asset;
            event.oldValue = oldValue;
            event.newValue = tx.newValue;
      		event.oldOwner = tx.oldOwner;
      		event.newOwner = tx.newOwner;
      
            emit(event);

        });
  }
}
