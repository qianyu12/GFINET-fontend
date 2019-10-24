<template>
  <div id="registerAndLogin">
    <el-container>
      <el-header>
        <city-header v-bind:value="traderName" v-bind:isLogin="false" v-on:log-out="logOut"></city-header>
      </el-header>
      <el-main>
        <h1>GFINet by Team 1</h1>
        <div class="trader-sys-main-content">
          <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom:20px;">
            <el-breadcrumb-item :to="{ path: '/index' }">index</el-breadcrumb-item>
            <el-breadcrumb-item>tradeSystem</el-breadcrumb-item>
          </el-breadcrumb>
          <el-popover placement="top-start" width="200" trigger="hover" content="add a new cusip">
            <el-button
              type="primary"
              style="float:left;"
              size="mini"
              slot="reference"
              @click="openAddCusipDialog"
            >Add Cusip</el-button>
          </el-popover>
          <el-table :data="tableData" stripe style="width:100%;" v-loading="tableLoading">
            <el-table-column label type="expand">
              <template slot-scope="props">
                <el-table :data="props.row.deals" :row-class-name="tableRowClassName" border>
                  <el-table-column label type="expand">
                    <template slot-scope="props2">
                      <el-card class="box-card" shadow="always">
                        <div slot="header" class="clearfix">
                          <span>Sales Deal Info</span>
                          <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
                        </div>
                        <div class="text item">
                          <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="TxnI">
                              <span>{{ props2.row.salerDeal.txnI }}</span>
                            </el-form-item>
                            <el-form-item label="Trade Date">
                              <span>{{ props2.row.salerDeal.tradeDate }}</span>
                            </el-form-item>
                            <el-form-item label="Volume">
                              <span>{{ props2.row.salerDeal.volume }}</span>
                            </el-form-item>
                            <el-form-item label="Price">
                              <span>{{ props2.row.salerDeal.price }}</span>
                            </el-form-item>
                            <el-form-item label="Notional Price">
                              <span>{{ props2.row.salerDeal.notionalPrincipal }}</span>
                            </el-form-item>
                            <el-form-item label="Dealer">
                              <span>{{ props2.row.salerDeal.tradeReciver }}</span>
                            </el-form-item>
                            <el-form-item label="Version">
                              <span>{{ props2.row.salerDeal.ver }}</span>
                            </el-form-item>
                            <el-form-item label="Status">
                              <span>{{ props2.row.salerDeal.status }}</span>
                            </el-form-item>
                            <el-form-item label="Note">
                              <span>{{ props2.row.salerDeal.note }}</span>
                            </el-form-item>
                          </el-form>
                        </div>
                      </el-card>
                    </template>
                  </el-table-column>
                  <el-table-column label="TxnI" prop="tradeDeal.txnI"></el-table-column>
                  <el-table-column label="Trade Date" prop="tradeDeal.tradeDate"></el-table-column>
                  <el-table-column label="Volume" prop="tradeDeal.volume"></el-table-column>
                  <el-table-column label="Price" width="180">
                    <template slot-scope="scope">
                      <el-input
                        v-model="scope.row.tradeDeal.price "
                        :disabled="isDisabled"
                        size="mini"
                        style="width:60px;"
                      ></el-input>
                      <el-button
                        :type="typeContent"
                        size="mini"
                        :icon="iconContent"
                        :loading="isSave"
                        v-on:click="editAndSave(scope.$index, scope.row)"
                      >{{buttonContent}}</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column label="NotionalPrice" prop="tradeDeal.notionalPrincipal"></el-table-column>
                  <el-table-column label="Dealer" prop="tradeDeal.tradeReciver"></el-table-column>
                  <el-table-column label="Version" prop="tradeDeal.ver"></el-table-column>
                  <el-table-column
                    label="Status"
                    prop="status"
                    :filters="statusFilter"
                    :filter-method="filterStatus"
                    width="200px;"
                  >
                    <!--四个状态：1:requested 2:pending 3:processed 4:accepted-->
                    <template slot-scope="scope">
                      <el-tag
                        :type="scope.row.tradeDeal.status === 'ACCEPTED' ? 'success' : scope.row.tradeDeal.status==='REJECTED'?'danger':scope.row.tradeDeal.status=='PENDING'?'warning':''"
                        disable-transitions
                      >{{scope.row.tradeDeal.status}}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column label="Option">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="danger"
                        @click="handleMerge(scope.$index, scope.row)"
                        v-if="scope.row.tradeDeal.shouldBeMerge"
                      >merge</el-button>
                    </template>
                  </el-table-column>
                  <el-table-column label="Note" prop="tradeDeal.note"></el-table-column>
                </el-table>
                <el-popover placement="right" width="200" trigger="hover" content="add a new deal">
                  <el-button
                    type="primary"
                    style="float:left; margin-top:10px;"
                    size="mini"
                    slot="reference"
                    @click="openDialog(props.row)"
                  >Add Trade</el-button>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="Cusip" prop="product.cusip"></el-table-column>
            <el-table-column label="Volume" prop="product.volume"></el-table-column>
            <el-table-column label="coupon" prop="product.coupon"></el-table-column>
            <el-table-column label="faceValue" prop="product.faceValue"></el-table-column>
            <el-table-column label="No. of Trades" prop="product.noOfTrades"></el-table-column>
          </el-table>
        </div>
      </el-main>
      <el-footer>
        <city-footer></city-footer>
      </el-footer>
    </el-container>
    <el-dialog title="Add one cusip" :visible.sync="dialogAddCusipVisible">
      <el-form :model="addCusipForm" label-position="top">
        <el-form-item label="cusipID">
          <el-select
            v-model="addCusipForm.cusipID"
            placeholder="please enter the cusip id"
            style="width:300px;"
            filterable
            remote
            :remote-method="remoteMethod"
            :loading="isSearching"
            @change="cusipIsSelected"
          >
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.cusip"
              :value="item.cusip"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddCusipVisible = false">Cancel</el-button>
        <el-button type="primary" @click="addOneCusip" :disabled="!isSelect">Confirm</el-button>
      </div>
    </el-dialog>
    <el-dialog title="Add one Trader" :visible.sync="dialogAddTraderDealVisible">
      <el-form :model="addTradeFlorm" label-position="top" inline>
        <el-form-item label="volume" :label-width="formLabelWidth">
          <el-input
            v-model="addTradeFlorm.volume"
            autocomplete="off"
            style="width:300px;"
            placeholder="please enter your volume"
            type="number"
          ></el-input>
        </el-form-item>
        <el-form-item label="price" :label-width="formLabelWidth">
          <el-input
            v-model="addTradeFlorm.price"
            autocomplete="off"
            style="width:300px;"
            type="number"
            placeholder="please enter your price"
          ></el-input>
        </el-form-item>
        <el-form-item label="note" :label-width="formLabelWidth">
          <el-input
            v-model="addTradeFlorm.note"
            autocomplete="off"
            style="width:300px;"
            placeholder="please enter your note"
          ></el-input>
        </el-form-item>
        <el-form-item label="receiver ID" :label-width="formLabelWidth">
          <el-input
            v-model="addTradeFlorm.receiver"
            autocomplete="off"
            style="width:300px;"
            placeholder="please enter your receiver"
            disabled
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddTraderDealVisible = false">Cancel</el-button>
        <el-button type="primary" @click="addTraderDeals">Confirm</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import CityHeader from '@/components/CityHeader'
import CityFooter from '@/components/CityFooter'
export default {
  name: 'RegisterAndLogin',
  data() {
    return {
      statusFilter: [
        {
          text: 'ACCEPTED',
          value: 'ACCEPTED'
        },
        {
          text: 'TPS_PROCESSED',
          value: 'TPS_PROCESSED'
        },
        {
          text: 'PENDING',
          value: 'PENDING'
        },
        {
          text: 'REJECTED',
          value: 'REJECTED'
        },
        {
          text: 'HELD',
          value: 'HELD'
        }
      ],
      isSelect: false,
      tableLoading: true,
      traderName: '',
      typeContent: 'primary',
      buttonContent: 'edit',
      iconContent: 'el-icon-edit',
      isDisabled: true,
      isSave: false,
      isSearching: false,
      formLabelWidth: '120px',
      dialogAddCusipVisible: false,
      dialogAddTraderDealVisible: false,
      addCusipForm: {
        cusipID: ''
      },
      options: [],
      remoteList: [
        {
          id: 1,
          name: 'cusip1'
        },
        {
          id: 2,
          name: 'cusip2'
        }
      ],
      addTradeFlorm: {
        productId: '',
        volume: '',
        price: '',
        receiver: 1,
        note: ''
      },
      tableData: [
        {
          cusip: 'XY12345',
          productId: 1,
          volume: '1000',
          noOfTrades: 2,
          notes: 2,
          deals: [
            {
              txnI: 12348,
              tradeDate: '2019-01-22',
              volume: 400,
              price: 105,
              totalPrice: 105 * 400,
              receiver: 'S1111',
              version: 4,
              status: 'accepted',
              note: '',
              shouldBeMerge: false,
              salesDeal: {
                txnI: 12348,
                tradeDate: '2019-01-22',
                volume: 400,
                price: 105,
                totalPrice: 105 * 400,
                receiver: 'S1111',
                version: 4,
                status: 'accepted',
                note: ''
              }
            }
          ]
        }
      ]
    }
  },
  components: {
    'city-header': CityHeader,
    'city-footer': CityFooter
  },
  created() {
    this.traderName = 'TW' + window.localStorage.getItem('userId')
    // this.tableLoading = false
    this.getTraderDeals()
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (row.tradeDeal.shouldBeMerge) {
        console.log('tag', row.tradeDeal.shouldBeMerge)
        return 'warning-row'
      }
      return ''
    },
    editAndSave(index, row) {
      //  put
      if (this.buttonContent === 'save') {
        // do uodate
        this.isSave = true
        var newPrice = row.tradeDeal.price
        var traderDealId = row.tradeDeal.txnI
        var params = new URLSearchParams()
        params.append('newPrice', newPrice)
        params.append('traderDealId', traderDealId)
        this.axios
          .put('http://47.100.138.62:8080/api/traderDeal', params)
          .then(response => {
            this.getTraderDeals()
            this.isSave = false
            this.isDisabled = !this.isDisabled
            this.typeContent =
              this.typeContent === 'primary' ? 'success' : 'primary'
            this.buttonContent = this.buttonContent === 'edit' ? 'save' : 'edit'
            this.iconContent =
              this.iconContent === 'el-icon-edit'
                ? 'el-icon-check'
                : 'el-icon-edit'
          })
          .catch(function(error) {
            // 请求失败处理
            console.log(error)
          })
      } else {
        this.isDisabled = !this.isDisabled
        this.typeContent = 'success'
        this.buttonContent = 'save'
        this.iconContent = 'el-icon-check'
      }
    },
    remoteMethod(query) {
      if (query !== '') {
        this.isSearching = true
        this.axios
          .get('http://47.100.138.62:8080/api/products')
          .then(response => {
            this.isSearching = false
            this.remoteList = response.data
            this.options = this.remoteList.filter(item => {
              return (
                item.cusip.indexOf(query.toLowerCase()) > -1 ||
                item.id.toString().indexOf(query.toLowerCase()) > -1
              )
            })
          })
          .catch(function(error) {
            // 请求失败处理
            console.log(error)
          })
      } else {
        this.options = []
      }
    },
    logOut() {
      window.localStorage.clear()
      this.$router.replace({ path: '/index' })
    },
    filterStatus(value, row) {
      return row.tradeDeal.status === value
    },
    addOneCusip() {
      //  do ajax
      var params = new URLSearchParams()
      console.log('cusipID', this.addCusipForm.cusipID)
      params.append('traderId', window.localStorage.getItem('userId'))
      params.append('productId', this.addCusipForm.cusipID)
      console.log('cusipId', this.addCusipForm)
      this.axios
        .post('http://47.100.138.62:8080/api/cusipUser', params)
        .then(response => {
          this.dialogAddCusipVisible = false
          this.tableLoading = true
          this.getTraderDeals()
        })
        .catch(function(error) {
          // 请求失败处理
          console.log(error)
        })
      this.dialogAddCusipVisible = false
    },
    handleMerge(index, row) {
      console.log('row-', row)
      var params = new URLSearchParams()
      params.append('salerDealId', row.salerDeal.txnI)
      params.append('traderDealPrice', row.tradeDeal.price)
      this.axios
        .put('http://47.100.138.62:8080/api/merge', params)
        .then(response => {
          this.tableLoading = true
          this.getTraderDeals()
          alert('merge success!')
        })
        .catch(function(error) {
          // 请求失败处理
          console.log(error)
        })
    },
    getTraderDeals() {
      var params = new URLSearchParams()
      var userId = window.localStorage.getItem('userId')
      params.append('traderId', window.localStorage.getItem('userId'))
      this.axios
        .get('http://47.100.138.62:8080/api/traderDeal', {
          params: {
            traderId: userId
          }
        })
        .then(response => {
          this.tableLoading = false
          var tempData = response.data.cusips
          this.tableData = tempData
          var cusipsAmmount = tempData.length
          for (var i = 0; i < cusipsAmmount; i++) {
            var deals = this.tableData[i].deals
            var dealsNumbers = deals.length
            this.tableData[i].product.noOfTrades = dealsNumbers
            this.tableData[i].product.volume = 0
            for (var k = 0; k < dealsNumbers; k++) {
              this.tableData[i].product.volume += this.tableData[i].deals[k].tradeDeal.volume
              if (
                this.tableData[i].deals[k].tradeDeal.status ===
                'PRICE_UNMATCHED'
              ) {
                this.tableData[i].deals[k].tradeDeal.status = 'PENDING'
                this.tableData[i].deals[k].tradeDeal.shouldBeMerge = true
              }
              console.log('tag', this.tableData[i].deals[k])
              if (!this.isNull(this.tableData[i].deals[k].salerDeal)) {
                this.tableData[i].deals[k].salerDeal.tradeDate = this.tableData[i].deals[k].tradeDeal.timestamp.split('T')[0]
              }
              this.tableData[i].deals[k].tradeDeal.tradeDate = this.tableData[i].deals[k].tradeDeal.timestamp.split('T')[0]
            }
          }
        })
        .catch(function(error) {
          // 请求失败处理
          console.log(error)
        })
    },
    addTraderDeals() {
      var params = new URLSearchParams()
      console.log('productId', this.addTradeFlorm.productId)
      params.append('productId', this.addTradeFlorm.productId)
      params.append('reciverId', 1)
      params.append('senderId', window.localStorage.getItem('userId'))
      params.append('price', this.addTradeFlorm.price)
      params.append('volume', this.addTradeFlorm.volume)
      this.axios
        .post('http://47.100.138.62:8080/api/traderDeal', params)
        .then(response => {
          console.log('response', response)
          this.tableLoading = true
          this.dialogAddTraderDealVisible = false
          this.getTraderDeals()
        })
        .catch(function(error) {
          // 请求失败处理
          console.log(error)
        })
    },
    openDialog(row) {
      console.log('productID info ', row)
      this.dialogAddTraderDealVisible = true
      this.addTradeFlorm.productId = row.product.cusip
    },
    openAddCusipDialog() {
      this.dialogAddCusipVisible = true
    },
    cusipIsSelected() {
      this.isSelect = true
    },
    isNull(arg1) {
      return !arg1 && arg1 !== 0 && typeof arg1 !== 'boolean' ? true : false
    }
  }
}
</script>
<style>
.main-content {
}
.el-footer {
  /* margin-top: -20px; */
  position: relative;
}
.el-table .warning-row {
  background: oldlace;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 180px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.clearfix {
  font-size: 25px;
  font-style: italic;
}
.el-dialog {
  text-align: left;
}
</style>
