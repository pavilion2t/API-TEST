import Associates from './Associates';
import Customers from './Customers';
import Favorites from './Favorites';
import FavoriteTabs from './FavoriteTabs';
import ModifierSets from './ModifierSets';
import Permissions from './Permissions';
import Listings from './Listings';
import TimeSegments from './TimeSegments';
import Department from './Department';
import CustomFields from './CustomFields';

import SnapshotJobs from './SnapshotJobs';
import ModifierGroups from './ModifierGroups';
import Category from './Category';
import TaxOption from './TaxOption';
import KitchenDepartment from './KitchenDepartment';
import Workflow from './Workflow';
import UnitGroup from './UnitGroup';
import Printer from './Printer';

/**
 * Store Service
 * @exports Main/Stores
 * @class
 * @author Green Qu <green.qu@bindo.com>
 */
class Stores {
  constructor(http) {
    this.http = http;

    this.all = this.all.bind(this);
    this.associate = this.associate.bind(this);
    this.customer = this.customer.bind(this);
    this.favorite = this.favorite.bind(this);
    this.favoriteTab = this.favoriteTab.bind(this);
    this.modifierSet = this.modifierSet.bind(this);
    this.permissions = this.permissions.bind(this);
    this.customField = this.customField.bind(this);
    this.modifierGroup = this.modifierGroup.bind(this);
    this.workflow = this.workflow.bind(this);
  }
  /**
   * Fetch all stores of a user.
   *
   * @example
   * client.main.stores.all()
   * @returns {Array} All stores.
   */
  async all() {
    const params = {
      per_page: 99,
    };
    const config = {
      normalizer: data => data.map(({ store }) => store),
    };
    const { data } = await this.http.get('/stores', params, config);
    return data;
  }
  /**
   * Get Module for a Store. .
   *
   * @example
   * client.main().store(1).module();
   * @returns {Object} Store module.
   */
  async module() {
    const config = {
      normalizer: ({ module }) => module,
    };
    const { data } = await this.http.get(`/stores/${this.storeId}/module`, null, config);
    return data;
  }
  /**
   * Get associate service instance.
   *
   * @example
   * // ...
   * @returns {Associates} Associate service.
   * @author Leo Li <leo.li@bindo.com>
   */
  get associates() {
    return this.associate();
  }
  /**
   * Get associate service instance, with id.
   *
   * @example
   * // ...
   * @param {number} id - Associate id.
   * @returns {Customers} Associate service with id.
   * @author Leo Li <leo.li@bindo.com>
   */
  associate(id) {
    if (!this.associateService) {
      this.associateService = new Associates(this.http);
    }
    this.associateService.storeId = this.storeId;
    this.associateService.associateId = id;
    return this.associateService;
  }
  /**
   * Get customer service instance.
   *
   * @example
   * // ...
   * @returns {Customers} Customer service.
   * @author Leo Li <leo.li@bindo.com>
   */
  get customers() {
    return this.customer();
  }
  /**
   * Get customer service instance, with id.
   *
   * @example
   * // ...
   * @param {number} id - Customer id.
   * @returns {Customers} Customer service with id.
   * @author Leo Li <leo.li@bindo.com>
   */
  customer(id) {
    if (!this.customerService) {
      this.customerService = new Customers(this.http);
    }
    this.customerService.storeId = this.storeId;
    this.customerService.customerId = id;
    return this.customerService;
  }
  /**
   * Get Favorites service instance.
   *
   * @example
   * // ...
   * @returns {Favorites} Favorite service.
   * @author Leo Li <leo.li@bindo.com>
   */
  get favorites() {
    return this.favorite();
  }
  /**
   * Get favorite service instance, with id.
   *
   * @example
   * // ...
   * @param {number} id - Favorite id.
   * @returns {Favorites} Favorite service with id.
   * @author Leo Li <leo.li@bindo.com>
   */
  favorite(id) {
    if (!this.favoriteService) {
      this.favoriteService = new Favorites(this.http);
    }
    this.favoriteService.storeId = this.storeId;
    this.favoriteService.favoriteId = id;
    return this.favoriteService;
  }
  /**
   * Get FavoriteTabs service instance.
   *
   * @example
   * // ...
   * @returns {FavoriteTabs} FavoriteTabs service.
   * @author Yori Zhao <yori.zhao@bindo.com>
   */
  get favoriteTabs() {
    return this.favoriteTab();
  }

  /**
   * Get favoriteTabs service instance with id.
   *
   * @example
   * // ...
   * @param {number} id - Favorite id.
   * @returns {FavoriteTabs} FavoriteTabs service with id.
   * @author Yori Zhao <yori.zhao@bindo.com>
   */
  favoriteTab(id) {
    if (!this.favoriteTabsService) {
      this.favoriteTabsService = new FavoriteTabs(this.http);
    }
    this.favoriteTabsService.storeId = this.storeId;
    this.favoriteTabsService.favoriteTabId = id;
    return this.favoriteTabsService;
  }

  /**
   * Get modifierSets service instance.
   *
   * @example
   * // ...
   * @returns {ModifierSets} modifierSets service.
   * @author Yori Zhao <yori.zhao@bindo.com>
   */
  get modifierSets() {
    return this.modifierSet();
  }

  /**
   * Get modifierSets service instance, with id.
   *
   * @example
   * // ...
   * @param {number} id - modifierSets id.
   * @returns {ModifierSets} modifierSets service with id.
   * @author Yori Zhao <yori.zhao@bindo.com>
   */
  modifierSet(id) {
    if (!this.modifierSetService) {
      this.modifierSetService = new ModifierSets(this.http);
    }
    this.modifierSetService.storeId = this.storeId;
    this.modifierSetService.modifierId = id;
    return this.modifierSetService;
  }

  /**
   * Get listing service instance
   *
   * @example
   * // ...
   * @returns {Listings} listing service.
   * @author Green.Qu <green.qu@bindo.com>
   */
  get listings() {
    return this.listing();
  }

  /**
   *Get listings service instance, with id.
   *
   * @example
   * // ...
   * @param {number} id -
   * @returns {Listings} listing service with id
   * @author Green.Qu <green.qu@bindo.com>
   */
  listing(id) {
    if (!this.listingService) {
      this.listingService = new Listings(this.http);
    }
    this.listingService.storeId = this.storeId;
    this.listingService.listingId = id;
    return this.listingService;
  }
  get departments() {
    if (!this.departmentService) {
      this.departmentService = new Department(this.http);
    }
    this.departmentService.storeId = this.storeId;
    return this.departmentService;
  }
  get categories() {
    if (!this.categoryService) {
      this.categoryService = new Category(this.http);
    }
    this.categoryService.storeId = this.storeId;
    return this.categoryService;
  }
  get taxOptions() {
    if (!this.taxOptionService) {
      this.taxOptionService = new TaxOption(this.http);
    }
    this.taxOptionService.storeId = this.storeId;
    return this.taxOptionService;
  }
  /**
   * Get permission service instance.
   *
   * @example
   * // ...
   * @returns {Permissions} Permission service.
   */
  permissions() {
    if (!this.id) {
      throw new Error('store id required to manipulate permission');
    }
    if (!this.permissionInstance) {
      this.permissionInstance = new Permissions(this.http);
    }
    this.permissionInstance.storeId = this.storeId;
    return this.permissionInstance;
  }
  /**
   * Get Time segment service instance.
   *
   * @example
   * // ...
   * @returns {TimeSegments} Time segment service.
   * @author Leo Li <leo.li@bindo.com>
   */
  get timeSegments() {
    return this.timeSegment();
  }
  /**
   * Get Time segment service instance, with id.
   *
   * @example
   * // ...
   * @param {number} id - Time segment id.
   * @returns {TimeSegments} Time segment service with id.
   * @author Leo Li <leo.li@bindo.com>
   */
  timeSegment(id) {
    if (!this.timeSegmentService) {
      this.timeSegmentService = new TimeSegments(this.http);
    }
    this.timeSegmentService.storeId = this.storeId;
    this.timeSegmentService.timeSegmentId = id;
    return this.timeSegmentService;
  }

  /**
   * Get customFields service instance.
   *
   * @example
   * // ...
   * @returns {CustomFields} Customer Fileds service.
   * @author Judy zhu <judy.zhu@bindo.com>
   */
  get customFields() {
    return this.customField();
  }
  /**
   * Get customer service instance, with id.
   *
   * @example
   * // ...
   * @param {number} id - CustomFileds id.
   * @returns {CustomFields} Customer Fileds service with id.
   * @author Judy zhu <judy.zhu@bindo.com>
   */
  customField(id) {
    if (!this.customFieldsService) {
      this.customFieldsService = new CustomFields(this.http);
    }
    this.customFieldsService.storeId = this.storeId;
    this.customFieldsService.customFiledId = id;
    return this.customFieldsService;
  }
  /**
   * Get snapshot job service instance.
   *
   * @example
   * // ...
   * @returns {Parties} Party service.
   * @author Leo Li <leo.li@bindo.com>
   */
  get snapshotJobs() {
    return this.snapshotJob();
  }
  /**
   * Get snapshot job service instance with id.
   *
   * @example
   * // ...
   * @param {string} uuid - Snapshot uuid.
   * @returns {SnapshotJobs} party service with id.
   * @author Leo Li <leo.li@bindo.com>
   */
  snapshotJob(uuid) {
    if (!this.snapshotJobService) {
      this.snapshotJobService = new SnapshotJobs(this.http);
    }
    this.snapshotJobService.storeId = this.storeId;
    this.snapshotJobService.snapshotUuid = uuid;
    return this.snapshotJobService;
  }

  /**
   * Get modifierGroups service instance.
   *
   * @example
   * // ...
   * @returns {ModifierGroups} ModifierGroups service.
   * @author Judy zhu <judy.zhu@bindo.com>
   */

  get modifierGroups() {
    return this.modifierGroup();
  }

  /**
   * Get modifierGroups service instance, with id.
   *
   * @example
   * // ...
   * @param {number} id - modifierGroups id.
   * @returns {ModifierGroups} modifierGroups service with id.
   * @author Judy zhu <judy.zhu@bindo.com>
   */
  modifierGroup(id) {
    if (!this.modifierGroupsService) {
      this.modifierGroupsService = new ModifierGroups(this.http);
    }
    this.modifierGroupsService.storeId = this.storeId;
    this.modifierGroupsService.modifierGroupsId = id;
    return this.modifierGroupsService;
  }

  // kitchenDepartment service
  get kitchenDepartments() {
    if (!this.kitchenDepartmentService) {
      this.kitchenDepartmentService = new KitchenDepartment(this.http);
    }
    this.kitchenDepartmentService.storeId = this.storeId;
    return this.kitchenDepartmentService;
  }

  // workflows service
  get workflows() {
    return this.workflow();
  }

  workflow(id) {
    if (!this.workflowsService) {
      this.workflowsService = new Workflow(this.http);
    }
    this.workflowsService.storeId = this.storeId;
    this.workflowsService.workflowsId = id;
    return this.workflowsService;
  }

  // printers service
  get printers() {
    return this.printer();
  }

  printer(id) {
    if (!this.printersService) {
      this.printersService = new Printer(this.http);
    }
    this.printersService.storeId = this.storeId;
    this.printersService.printersId = id;
    return this.printersService;
  }

  /**
   * Get unit group service instance.
   *
   * @example
   * // ...
   * @returns {Customers} Customer service.
   * @author Green <green.qu@bindo.com>
   */
  get unitGroups() {
    if (!this.unitGroupService) {
      this.unitGroupService = new UnitGroup(this.http);
    }
    this.unitGroupService.storeId = this.storeId;
    return this.unitGroupService;
  }
}

export default Stores;
